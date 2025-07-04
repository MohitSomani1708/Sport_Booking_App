import React from 'react'

const Button = ({type, text, color, handler}) => {
  return (
        <button style={{ backgroundColor : color,  width : '100%', height : '100%', margin : '10px'}} className='button' type={type} onClick = {handler}>{text}</button>
  )
}

export default Button