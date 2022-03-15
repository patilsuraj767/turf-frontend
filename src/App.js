import TopBar from "./components/TopBar";
import { Container } from "react-bootstrap";
import { Route, Routes, BrowserRouter, } from "react-router-dom";
import Home from "./pages/Home";
import CreateBooking from "./pages/CreateBooking";
import EditBooking from "./pages/EditBooking";
import BookingDetails from "./pages/BookingDetails";

function App() {
  return (
    <Container>
    <div className="App">
      <BrowserRouter>
        <TopBar />
        <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/createbooking" element={<CreateBooking />} />
          <Route path="/editbooking/:id" element={<EditBooking  />} />
          <Route path="/bookingdetails/:id" element={<BookingDetails />} />
        </Routes>
        </div>
      </BrowserRouter>
    </div>
    </Container>
  );
}

export default App;
