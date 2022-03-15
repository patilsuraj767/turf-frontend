import { useEffect, useState } from "react";
import { Table, Alert } from "react-bootstrap";
import { Tooltip, IconButton } from '@mui/material';
import ConfirmModal from "../components/ConfirmModal";
import { Link } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import InfoIcon from '@mui/icons-material/Info';

const Home = () => {
    const [bookings, setBookings] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const [modalData, setModalData] = useState({})
    const todaysDate = new Date().toISOString().slice(0, 10)
    const [inputBookingDate, setInputBookingDate] = useState(todaysDate)

    useEffect(() => {
        const abortCont = new AbortController();
        fetch('http://127.0.0.1:1323/api/turf/v1/bookings/', {signal: abortCont.signal})
           .then(res => {
               if(!res.ok) {
                   throw Error('Could not fetch the data from server');
               }
                return res.json();
           })
           .then((data) => {
                setBookings(data);
                setIsLoading(false);
           })
           .catch(err => {
                if (!err.name === 'AbortError'){
                    setIsLoading(false);
                    setError(err.message);
                }
           })

           return () => abortCont.abort()
    }, []);

    const confirmDelete = (bookingID) => {
        setModalData({
            show: true,
            bookingID: bookingID,
            title: "Delete confirmation",
            body: "Are you sure you want to delete the record?",
            buttonAction: "Delete",
            buttonVariant: "danger"
        })
        
    } 

    const handleDelete = (bookingID) => {
        setModalData({})
        fetch('http://127.0.0.1:1323/api/turf/v1/bookings/' + bookingID, {
            method: 'DELETE'
        }).then((res) => {
            if(!res.ok) {
                throw Error('Could not delete the data from server');
            }
            setBookings(() => bookings.filter((booking) => booking.ID !== bookingID) )
        }).catch(err => {
            setError(err.message);
        })
    }

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        console.log(inputBookingDate)
        const abortCont = new AbortController();
        fetch('http://127.0.0.1:1323/api/turf/v1/bookings/date/' + inputBookingDate, {signal: abortCont.signal})
           .then(res => {
               if(!res.ok) {
                   throw Error('Could not fetch the data from server');
               }
                return res.json();
           })
           .then((data) => {
                console.log(data)
                setBookings(data);
                setIsLoading(false);
           })
           .catch(err => {
                if (!err.name === 'AbortError'){
                    setIsLoading(false);
                    setError(err.message);
                }
           })

           return () => abortCont.abort()
    }
    return (
        <>
            <div className="dateSelector">
                <form onSubmit={handleSearchSubmit}>
                    <label>Date: </label>
                    <input type="date" name="inputBookingDate" value={inputBookingDate} onChange={(e)=>{setInputBookingDate(e.target.value)}} required />
                    <IconButton type="submit"><SearchIcon /></IconButton>
                </form>
            </div>
            <div>
                { error && <Alert variant='danger'>{error}</Alert>}
                {isLoading && <div>Loading... </div>}
                { modalData && <ConfirmModal data={modalData} setModalData={setModalData} runFunc={handleDelete} />}
                
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Booking date</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Description</th>
                        <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        { bookings &&
                            bookings.map((booking) => (
                                    <tr key={booking.ID}>
                                    <td>{booking.ID}</td>
                                    <td>{booking.Customer.Name}</td>
                                    <td>{booking.BookingDate}</td>
                                    <td>{booking.StartTime}</td>
                                    <td>{booking.EndTime}</td>
                                    <td>{booking.Description}</td>
                                    <td>
                                        <div className="actionColumn">
                                            <Tooltip title="Info" arrow>
                                                <IconButton component={Link} to={`/bookingdetails/${booking.ID}`}>
                                                        <InfoIcon />
                                                </IconButton>
                                            </Tooltip>    
                                            <Tooltip title="Delete" arrow>
                                                <IconButton onClick={() => {confirmDelete(booking.ID)}}>
                                                    <DeleteIcon>Delete</DeleteIcon>
                                                </IconButton>
                                            </Tooltip>
                                        </div>
                                    </td>   
                                    </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </div>
            
        </>
    )
}

export default Home; 