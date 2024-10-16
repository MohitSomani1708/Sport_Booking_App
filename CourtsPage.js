import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function CourtsPage() {
  const location = useLocation();
  const { sport } = location.state; // Get the selected sport from state

  const [courts, setCourts] = useState([
    { id: 1, number: 1, bookedSlots: ["10:00 AM"] }, // Court 1 with one booked slot
    { id: 2, number: 2, bookedSlots: [] },            // Court 2 with no booked slots
  ]);

  const timeSlots = ["10:00 AM", "11:00 AM", "12:00 PM"];

  const handleBooking = (courtId, slot) => {
    const updatedCourts = courts.map((court) => {
      if (court.id === courtId && !court.bookedSlots.includes(slot)) {
        return { ...court, bookedSlots: [...court.bookedSlots, slot] };
      }
      return court;
    });
    setCourts(updatedCourts);
  };

  return (
    <div className="container mt-4">
      <h3>Available Courts for {sport.name}</h3>
      {courts.map((court) => (
        <div key={court.id} className="card mt-3">
          <div className="card-body">
            <h5>Court {court.number}</h5>
            {timeSlots.map((slot) => (
              <button
                key={slot}
                className={`btn btn-block ${court.bookedSlots.includes(slot) ? 'btn-danger' : 'btn-success'} mt-2`}
                onClick={() => !court.bookedSlots.includes(slot) && handleBooking(court.id, slot)}
                disabled={court.bookedSlots.includes(slot)}
              >
                {slot} - {court.bookedSlots.includes(slot) ? 'Unavailable' : 'Available'}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default CourtsPage;
