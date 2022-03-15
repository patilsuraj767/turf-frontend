import { useState } from "react"
import { useNavigate } from 'react-router-dom';
import BookingForm from "../components/BookingForm";
const CreateBooking = () => {
    const initialValues = {name: "", mobile: "",
                           bookingDate: "", startTime: "",
                           endTime: "", description: ""}
    const [formValues, setFormValues] = useState(initialValues)
    const [isPending, setIsPending] = useState(false)
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formValues)
        setIsPending(true);
        fetch('http://127.0.0.1:1323/api/turf/v1/bookings/', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(formValues)
        }).then(() => {
            setIsPending(false);
            navigate('/');
        })
    }
    return (
        <div className="formBooking">
            <h2>Add a New Booking</h2>
            <BookingForm
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                formValues={formValues}
                isPending={isPending}
                buttonTitle="Add Booking"
                disableButtonTitle="Creating Booking..."
            />        
        </div>
    )
}

export default CreateBooking;