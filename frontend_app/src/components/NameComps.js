import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../AppContext';
import { IoMdRemoveCircleOutline } from "react-icons/io";

const NameComps = ({ name, color, navigate, canRemove = 0}) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigateTo = useNavigate();
  const {setBlur, setPopUp, setDate, setSport} = useAppContext();

  const handleMouseEnter = () => {
    if(navigate){
        navigateTo(navigate);
    }
  };

  const handleRemove =(e)=>{
    setBlur(true);
    setPopUp(true);
  }


  const boxStyle = {
    borderRadius: '10px',
    backgroundColor: color ? color : 'rgb(183, 176, 175)', // Change color on hover
    width: '100%',
    height: '50px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer', // To indicate it's clickable
    color: 'black',
    fontWeight: 'normal', // Or you can use a number like 100, 200, etc.

  };

  return (
      <div style={{display : 'flex', alignItems : 'center', justifyContent : 'center', zIndex : 0}}>
        <h2
          style={boxStyle}
          onClick={handleMouseEnter}>
          {name}
        </h2>
        {canRemove === 1 && <div style={{position : 'relative' , right : '50px'}} onClick={handleRemove}><IoMdRemoveCircleOutline/></div>}
      </div>
      

  );
};

export default NameComps;
