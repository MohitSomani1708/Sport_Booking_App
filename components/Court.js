import React, { useState, useEffect } from 'react';

function Court({ sport }) {
  const [courts, setCourts] = useState([
    { id: 1, number: 1, bookedSlots: ["10:00 AM"] }, // Court 1, slot "10:00 AM" already booked
    { id: 2, number: 2, bookedSlots: [] }            // Court 2, no booked slots yet
  ]);

  const timeSlots = ["10:00 AM", "11:00 AM", "12:00 PM"];

  const handleBooking = (courtId, slot) => {
    const updatedCourts = courts.map(court => {
      if (court.id === courtId) {
        if (!court.bookedSlots.includes(slot)) {
          return { ...court, bookedSlots: [...court.bookedSlots, slot] };
        }
      }
      return court;
    });
    setCourts(updatedCourts);
  };

  return (
    <div className="mt-3">
      <h4>Available Courts for {sport.name}</h4>
      {courts.map(court => (
        <div key={court.id} className="card mt-3">
          <div className="card-body">
            <h5>Court {court.number}</h5>
            <div>
              {timeSlots.map(slot => (
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
        </div>
      ))}
    </div>
  );
}

export default Court;
