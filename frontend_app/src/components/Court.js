import React, { useState } from 'react'
import CourtColumn from './CourtColumn'

const Court = ({courts, setCourtId, bookings}) => {
  return (
    <div style={{position : 'absolute', top : '150px', left : 'max(25%, 280px)'}}>
        <span style={{height : '100%' ,outline : '1px solid lightgray' , display : 'flex'}}>
       {
           courts.map((e, idx)=>{
               return <CourtColumn  bookings = {bookings} ac_id = {e._id} id={idx} setCourtId={setCourtId}/>
            })
        }
        </span>
    </div>
  )
}

export default Court