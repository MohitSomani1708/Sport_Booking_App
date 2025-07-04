import React from 'react'

const InputBar = ({type, placeholder, value, setFunc}) => {
  return (
        <input className='input-bar' type={type} placeholder={placeholder} value={value}  onChange={(e) => setFunc(e.target.value)}></input>
  )
}

export default InputBar