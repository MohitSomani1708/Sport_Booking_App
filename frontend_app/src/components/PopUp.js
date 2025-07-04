import React from 'react'
import Button from './Button'
import { useAppContext } from '../AppContext'

const PopUp = ({confirmHandler, CancelHandler, text}) => {

  return (
    <div style={{borderRadius : '3px', outline : '1px solid black', position: 'fixed' ,bottome : '40px', right : '100px', backgroundColor : 'lightblue' ,height : '300px', width : '450px', textAlign : 'center', zIndex : '40', display : 'flex', flexDirection : 'column', alignItems : 'center'}}>
       <h2 style={{position : 'relative' ,top : '20px'}}>
           {text}
        </h2>
        <span style={{position : 'relative', display : 'flex', justifyContent : 'centre', alignItems : 'center', bottom : '-150px', width : '80%', height : '40px',}}>
            <Button text="Confirm" color="lightgreen" handler = {confirmHandler}/> 
            <Button text="Cancel" color="red" handler = {CancelHandler}/> 
        </span>
    </div>
  )
}

export default PopUp