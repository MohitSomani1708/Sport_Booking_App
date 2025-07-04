import React from 'react'
import SingleSlot from './SingleSlot';

const CourtColumn = ({ac_id , id, setCourtId, bookings}) => {
const slots = ['5am', '6am' , '7am' , '8am' , '9am'];
  return (
        <div style={{width : '220px', height : '100%', textAlign : 'center'}}>
            <div style={{marginTop : '10px'}}>
                {`Court ${id}`}
            </div>
            <div style={{display : 'flex', flexDirection : 'column', alignItems : 'center'}}>
                {
                    slots.map((e)=>{
                        return <SingleSlot bookings = {bookings} time = {e} setCourtId = {setCourtId} ac_id={ac_id}/>
                    })
                }
            </div>
        </div>
  )
}

export default CourtColumn