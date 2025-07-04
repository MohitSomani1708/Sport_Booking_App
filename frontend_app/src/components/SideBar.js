import React from 'react';
import NameComps from './NameComps';
import UserSvg from '../UserSvg';
import SignOutIcon from '../Signout';
import { MdOutlineExitToApp } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const arr = [
    { name: 'Create Booking', navigate: '/dashboard' },
    { name: 'All Bookings', navigate: '/dashboard/all' },
];

const SideBar = () => {
const  navigate = useNavigate();
const handleLogout = ()=>{
  localStorage.removeItem('token');
  localStorage.removeItem('name');
  navigate('/');
}
const handleMouseEnter = (e)=>{
  e.preventDefault();

}
  return (
    <div style={{
      backgroundColor: 'rgb(163, 169, 173)', 
      fontWeight: '0', 
      width: '20%', 
      minWidth: '250px', 
      position: 'fixed', // fixed position for the sidebar
      height: '100vh', // 100% of the viewport height
      left: '0px', 
      top: '0px', // Ensure it stays at the top
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center',
      overflowY: 'auto', // Allow vertical scrolling if content overflows
      zIndex : 10
    }}>
      <div style={{ width: '80%' }}>
        {
          arr.map((e) => {
            return <NameComps key={e.name} name={e.name} color='rgb(228, 233, 238)' navigate={e.navigate} />
          })
        }
      </div>
        <div style={{position : 'absolute' , bottom : '10px', width : '80%' }}>
          <span  style={{ position : 'relative' ,top : '60px', left : '30px'}} >
          < UserSvg />
          </span>  
          <NameComps name = {localStorage.getItem('name') } color='rgb(228, 233, 238)'/>
          <span onClick={handleLogout} style={{ position : 'relative' , height : '50px',top : '-55px', left : '210px', cursor :'pointer'}} >
            <MdOutlineExitToApp />
          </span>  
        </div>
    </div>
  );
}

export default SideBar;
