import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { Alert } from "react-bootstrap";
import BookingForm from "../components/BookingForm";

const EditBooking = () =>{

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false)

    const navigate = useNavigate();

    let params = useParams();
    const initialValues = {name: "", mobile: "",
                           bookingDate: "", startTime: "",
                           endTime: "", description: ""}
    const [formValues, setFormValues] = useState(initialValues)
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
                setFormValues({name: data.Customer.Name, mobile: data.Customer.Mobile,
                bookingDate: data.BookingDate.split("T")[0], startTime: data.StartTime,
                endTime: data.EndTime, description: data.Description});
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

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsPending(true);
        fetch('http://127.0.0.1:1323/api/turf/v1/bookings/' + params.id, {
            method: 'PUT',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(formValues)
        }).then(() => {
            setIsPending(false);
            navigate('/');
        })
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    }
    
    return (
        <div className="formBooking">
            <h2>Edit Booking</h2>
            { error && <Alert variant='danger'>{error}</Alert>}
            {isLoading && <div>Loading... </div>}
            <BookingForm
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                formValues={formValues}
                isPending={isPending}
                buttonTitle="Edit Booking"
                disableButtonTitle="Modifing Booking..."
            />
        </div>
    )
}
export default EditBooking;