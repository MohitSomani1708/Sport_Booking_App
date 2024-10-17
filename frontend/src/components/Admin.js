import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Admin.css'; // Use the same CSS file for styling

const timeSlots = ["6:00 AM", "7:00 AM", "8:00 AM", "9:00 AM", "10:00 AM"];
const centresData = {
  Indiranagar: {
    sports: {
      Badminton: ["Court 1", "Court 2", "Court 3"],
      Cricket: ["Ground 1", "Ground 2"],
      Basketball: ["Court 1", "Court 2"]
    }
  },
  Koramangala: {
    sports: {
      Badminton: ["Court 1", "Court 2", "Court 3"],
      Cricket: ["Ground 1", "Ground 2"],
      Basketball: ["Court 1", "Court 2"]
    }
  }
};

function Admin() {
  const defaultCentre = "Indiranagar";
  const defaultSport = "Badminton";
  const defaultDate = new Date().toISOString().split('T')[0];

  const [bookings, setBookings] = useState([]);
  const [selectedCentre, setSelectedCentre] = useState(defaultCentre);
  const [selectedSport, setSelectedSport] = useState(defaultSport);
  const [selectedDate, setSelectedDate] = useState(defaultDate);
  const [availableCourts, setAvailableCourts] = useState(centresData[selectedCentre]?.sports[selectedSport] || []);

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [selectedCourt, setSelectedCourt] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

  const [userName, setUserName] = useState('');
  const [userStatus, setUserStatus] = useState('Pending Payment');

  useEffect(() => {
    setAvailableCourts(centresData[selectedCentre]?.sports[selectedSport] || []);
  }, [selectedCentre, selectedSport]);

  const fetchBookings = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/bookings', {
        params: { centre: selectedCentre, sport: selectedSport, date: selectedDate }
      });
      setBookings(response.data);
    } catch (err) {
      console.error('Error fetching bookings:', err);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [selectedCentre, selectedSport, selectedDate]);

  const handleNewBooking = async () => {
    const newBooking = {
      centre: selectedCentre,
      sport: selectedSport,
      court: selectedCourt,
      timeSlot: selectedTimeSlot,
      user: userName,
      status: userStatus,
      date: selectedDate
    };

    try {
      const response = await axios.post('http://localhost:5000/api/bookings', newBooking);
      setBookings([...bookings, response.data]);
      setShowUserModal(false);  // Close the user modal after booking
    } catch (err) {
      console.error('Error creating booking:', err);
      if (err.response && err.response.status === 400) {
        alert(err.response.data.message);
      }
    }
  };

  const handleSlotClick = (court, timeSlot) => {
    setSelectedCourt(court);
    setSelectedTimeSlot(timeSlot);
    setShowConfirmModal(true);  
  };

  const handleConfirmClick = () => {
    setShowConfirmModal(false); 
    setShowUserModal(true);     
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    window.location.href = '/login';  // Redirect to login page
  };

  const renderBooking = (court, time) => {
    const booking = bookings.find(b => b.court === court && b.timeSlot === time);

    if (booking) {
      const statusClass = booking.status === 'Checked-in' ? 'light-green' : 'yellow';
      return (
        <div className={`booking-slot ${statusClass}`}>
          {booking.user} <br />
          {booking.status}
</div>
      );
    }

    return (
      <div className="booking-slot available" onClick={() => handleSlotClick(court, time)}>
        <span>Available</span>
      </div>
    );
  };

  return (
    <div className="container mt-5">
      <div className="admin-header">
        <h3>Dashboard</h3>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="form-group">
        <label>Select Centre:</label>
        <select className="form-control" onChange={(e) => setSelectedCentre(e.target.value)} value={selectedCentre}>
          {Object.keys(centresData).map((centre, index) => (
            <option key={index} value={centre}>{centre}</option>
          ))}
        </select>
      </div>

      <div className="form-group mt-3">
        <label>Select Sport:</label>
        <select className="form-control" onChange={(e) => setSelectedSport(e.target.value)} value={selectedSport}>
          {Object.keys(centresData[selectedCentre]?.sports || {}).map((sport, index) => (
            <option key={index} value={sport}>{sport}</option>
          ))}
        </select>
      </div>

      <div className="form-group mt-3">
        <label>Select Date:</label>
        <input type="date" className="form-control" onChange={(e) => setSelectedDate(e.target.value)} value={selectedDate} />
      </div>

      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>Time Slots</th>
            {availableCourts.map((court, index) => (
              <th key={index}>{court}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timeSlots.map((time, timeIndex) => (
            <tr key={timeIndex}>
              <td>{time}</td>
              {availableCourts.map((court, courtIndex) => (
                <td key={courtIndex}>
                  {renderBooking(court, time)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* First Modal: Confirm Booking */}
      {showConfirmModal && (
        <div className="modal modal-show">
          <div className="modal-content">
            <h5>Confirm Booking</h5>
            <p>Do you want to book {selectedCourt} at {selectedTimeSlot}?</p>
            <button className="btn-confirm" onClick={handleConfirmClick}>Confirm</button>
            <button className="btn-cancel" onClick={() => setShowConfirmModal(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Second Modal: Enter User Details */}
      {showUserModal && (
        <div className="modal modal-show">
          <div className="modal-content">
            <h5>Enter Booking Details</h5>
            <div className="form-group">
              <label>User Name:</label>
              <input
                type="text"
                className="form-control"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Enter user name"
              />
            </div>
            <div className="form-group">
              <label>Status:</label>
              <select
                className="form-control"
                value={userStatus}
                onChange={(e) => setUserStatus(e.target.value)}
              >
                <option value="Pending Payment">Pending Payment</option>
                <option value="Checked-in">Checked-in</option>
              </select>
            </div>
            <button className="btn-confirm" onClick={handleNewBooking}>Submit</button>
            <button className="btn-cancel" onClick={() => setShowUserModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin;