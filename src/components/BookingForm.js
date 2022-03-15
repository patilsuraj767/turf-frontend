import "./bookingForm.css"
const BookingForm = (props) => {
    return (
        <form className="bookingForm" onSubmit={props.handleSubmit}>
            <label>Name: </label>
            <input type="text" name="name" value={ props.formValues.name } onChange={props.handleChange} required />
            <label>Mobile Number: </label>
            <input type="number" name="mobile" value={ props.formValues.mobile } onChange={props.handleChange} required />
            <label>Booking Date: </label>
            <input type="date" name="bookingDate" value={ props.formValues.bookingDate } onChange={props.handleChange} required />
            <label>Start Time: </label>
            <input type="time" name="startTime" value={ props.formValues.startTime } onChange={props.handleChange} required />
            <label>End Time: </label>
            <input type="Time" name="endTime" value={ props.formValues.endTime } onChange={props.handleChange} required />
            <label>Description: </label>
            <textarea name="description" value={ props.formValues.description } onChange={props.handleChange} />
            {!props.isPending && <button className="submitbutton">{props.buttonTitle}</button>}
            {props.isPending && <button disabled>{props.disableButtonTitle}</button>}
        </form>
    )
}

export default BookingForm;