import React, { useEffect } from 'react';
import SideBar from '../components/SideBar';
import InputBar from '../components/InputBar';
import Button from '../components/Button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NameComps from '../components/NameComps';
import { useAppContext } from '../AppContext';
import PopUp from '../components/PopUp';


const AllBookingsPage = () => {
    const [seacrh, setSearch] = useState('');
    const navigate = useNavigate();
    const [bookings, setBookings] = useState(null);
    const {center, date,popup,sport,blur, slotTime, setBlur, setPopUp, setDate, setSport} = useAppContext();
    const token = localStorage.getItem('token');
    const confirmHandler = (e)=>{
      // cancel the booking 
      setBlur(false);
      setPopUp(false);
    }
    
    const CancelHandler = ()=>{
      setBlur(false);
      setPopUp(false);
    
    }

    useEffect(()=>{
      async function getBookings() {
          try{
            console.log('here')
            const apiUrl = process.env.REACT_APP_API_URL + "/bookings/my-bookings" // Get the API URL from the env
            console.log(apiUrl);
            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
                },
            });
            const data = await response.json();
            console.log(data)
            let temp = []
            data.forEach(booking => {
              temp.push(`${booking.sport.name}, ${booking.centre.name}`)
            });
            setBookings(temp)
          }
          catch(err){
            console.log(err)
          }
        }
        // if (token) {
          getBookings();
        // } else {
          // console.log('No token found, skipping fetch.');
        // }
    },[])

    return (
      <>
     <div className='pages' style={{ filter: blur ? 'blur(5px)' : 'none' , zIndex : '0'}}>
      <SideBar/>
      <h1 style={{position: 'absolute' , top : '10px' , left: 'max(25%, 280px)'}}>All Bookings</h1>
      <div style={{fontWeight : "0",  top : '100px', width: 'max(60%, 100px)',  position : 'absolute' , left: 'max(25%, 280px)', display:'flex', flexDirection:'column', zIndex : 0}}>
        {
          bookings && bookings.map((e)=>{
            return <NameComps name={e} color='rgb(228,233,238)' canRemove={1}/>
          })
        }
    </div>
    </div>
        {
          popup && <PopUp confirmHandler={confirmHandler} CancelHandler={CancelHandler} text = "Are you sure you want to cancel booking?"/>
        }
    </>
  );
};

export default AllBookingsPage;
