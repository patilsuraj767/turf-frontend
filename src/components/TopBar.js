import { Link } from "react-router-dom";
const TopBar = () => {
  return (
    <nav className="navbar">
      <Link to='/'><h1>Turf</h1></Link>
      <div className="links">
        <Link  to="/">Home</Link >
        <Link  to="/createbooking" style={{ 
          color: 'white', 
          backgroundColor: '#08bd71',
          borderRadius: '8px' 
        }}>New Booking</Link>
      </div>
    </nav>
  )
}

export default TopBar;
