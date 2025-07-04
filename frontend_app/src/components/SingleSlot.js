import React from 'react';
import { useAppContext } from '../AppContext';

const SingleSlot = ({ ac_id, time, setCourtId, bookings }) => {
    const { popUp, setPopUp, setSlotTime } = useAppContext();
    const { blur, setBlur } = useAppContext();

    // Determine if the slot is booked
    const isBooked = bookings.some(
        (booking) => booking.court === ac_id && booking.slot_time === time
    );

    // Set val based on booking status
    const val = isBooked ? 1 : 0;

    const handleClick = (e) => {
        e.preventDefault();
        setPopUp(true);
        setBlur(true);
        setCourtId(ac_id);
        setSlotTime(time);
    };

    // Define styles based on the value of val
    const backgroundColor = val === 1 ? 'darkgray' : 'initial'; // Set dark gray if val is 1
    const cursorStyle = val === 1 ? 'not-allowed' : 'pointer'; // Change cursor if val is 1

    return (
        <div
            style={{
                width: '80%',
                borderRadius: '10px',
                outline: '1px solid black',
                height: '70px',
                marginTop: '15px',
                marginBottom: '15px',
                backgroundColor: backgroundColor,
                cursor: cursorStyle,
            }}
            onClick={val === 1 ? null : handleClick}
        >
            {time}
        </div>
    );
};

export default SingleSlot;
