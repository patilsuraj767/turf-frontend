import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Alert } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import Button from '@mui/material/Button';
import CheckIcon from '@mui/icons-material/Check';
import Stack from '@mui/material/Stack';
import EditIcon from '@mui/icons-material/Edit';
import "./bookingDetails.css"
import { fontWeight } from "@mui/system";

const BookingDetails = () => {
    const [booking, setBooking] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [charges, setCharges] = useState('');

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let params = useParams();

    useEffect(() => {
        const abortCont = new AbortController();
        fetch('http://127.0.0.1:1323/api/turf/v1/bookings/' + params.id, {signal: abortCont.signal})
           .then(res => {
               if(!res.ok) {
                   throw Error('Could not fetch the data from server');
               }
                return res.json();
           })
           .then((data) => {
                setBooking(data);
                setIsLoading(false);
           })
           .catch(err => {
                if (!err.name === 'AbortError'){
                    setIsLoading(false);
                    setError(err.message);
                }
           })

           return () => abortCont.abort()
    }, [params.id])

    const handleCompletedSubmit = () => {
        setShow(false);
        console.log(charges)
    }
    return (
        <>
            { error && <Alert variant='danger'>{error}</Alert>}
            {isLoading && <div>Loading... </div>}
            {!isLoading && <div className="bookingdetails">
                <div>
                    <div>
                        <span className="detailAttribute">Booking ID:</span><span>{booking.ID}</span> 
                    </div>
                    <div>
                        <span className="detailAttribute" >Name:</span><span>{booking.Customer.Name}</span>
                    </div>
                    <div>
                        <span className="detailAttribute">Mobile Number:</span><span>{booking.Customer.Mobile}</span>
                    </div>
                    <div>
                        <span className="detailAttribute">Booking Date:</span><span>{booking.BookingDate}</span>
                    </div>
                    <div>
                        <span className="detailAttribute">Start Time:</span><span>{booking.StartTime}</span>
                    </div>
                    <div>
                        <span className="detailAttribute">End Time:</span><span>{booking.EndTime}</span>
                    </div>
                    <div>
                        <span className="detailAttribute">Description:</span><span>{booking.Description}</span>
                    </div>
                    <div>
                        <span className="detailAttribute">Charges:</span><span>1000</span>
                    </div>
                    <div>
                        <span className="detailAttribute">Status:</span><span>Pending | Completed | Absent</span>
                    </div>            
            </div>
            <div className="actionPanel">
            <Stack direction="row" spacing={2}>
                <Button component={Link} to={`/editbooking/${booking.ID}`} variant="outlined" startIcon={<EditIcon />}>
                    Edit
                </Button>
                <Button variant="contained" onClick={handleShow} endIcon={<CheckIcon />}>
                    Completed
                </Button>
            </Stack>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Mark booking as completed</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label style={{marginRight: '10px', fontWeight: 500}}>Charges: </label>
                    <input type="text" name="charges" value={charges} onChange={(e) => {setCharges(e.target.value)}} required />
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleCompletedSubmit}>
                    Submit
                </Button>
                </Modal.Footer>
            </Modal>
            </div>
            </div>
            }
        </>
    )
}

export default BookingDetails;