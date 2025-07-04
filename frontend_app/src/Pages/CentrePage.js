import React, { useContext, useEffect } from 'react';
import SideBar from '../components/SideBar';
import InputBar from '../components/InputBar';
import Button from '../components/Button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NameComps from '../components/NameComps';
import { useParams } from 'react-router-dom';
import Dropdown from '../components/Dropdown';
import Court from '../components/Court';
import { useAppContext } from '../AppContext';
import PopUp from '../components/PopUp';

const DashBoardPage = () => {
    const [search, setSearch] = useState('');
    const navigate = useNavigate();
    const [bookings, setBookings] = useState([]);
    const { centrename } = useParams();
    const savedCentres = JSON.parse(localStorage.getItem('centres') || '[]');
    const [centres, setCentres] = useState(savedCentres);
    const [sports, setSports] = useState();
    const [courts, setCourts] = useState();
    const [centreInfo, setCentreInfo] = useState(JSON.parse(localStorage.getItem('centreinfo')));
    
    const { centre, setCentre, date, popup, sport, blur, setBlur, setPopUp, setDate, setSport, slotTime} = useAppContext();
    const [centerid, setCentreId] = useState();
    const [sportsId, setSportsId] = useState();
    const [CourtId, setCourtid] = useState();
    setCentre(centrename);
    const token = localStorage.getItem('token');
    
    const dates = [];
    const generateDates = () => {
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        const currentDate = new Date();
        for (let i = 0; i <= 7; i++) {
            const newDate = new Date();
            newDate.setDate(currentDate.getDate() + i); 
            const formattedDate = newDate.toLocaleDateString('en-GB', options);
            dates.push(formattedDate);
        }
        console.log(dates);
    };

    const fillSports = () => {
        // setTimeout(()=>{}, 1000);
        if (centres) {
            console.log(centres);
            console.log(centrename);
            // Find the sports array for the specific centre
            const sportsArray = centres
                .filter(e => e.name === centrename);  // Filter to find the matching centre
                // .map(e => e);             // Extract the sports array from the centre
                // sportsArray = sportsArray.sports;
                let narr = sportsArray[0].sports;
                setCentreInfo(sportsArray[0]);
                setCentreId(sportsArray[0]._id);
                localStorage.setItem('centreInfo' , JSON.stringify(sportsArray[0]));
                // Flatten the sportsArray and avoid null/undefined values
                // const sports1 = sportsArray.flat().filter(e => e != null);
                narr = narr.map((e)=>{
                    return e.name;
                })
                console.log(narr);
            setSports(narr);
            // // Log the sports names
            // setSports(sports1);
        
            // console.log(sports1);  // Log the array of sports
        }
    };
    generateDates();

    useEffect(()=>{
        async function getCourts() {
            try{
                const apiUrl = process.env.REACT_APP_API_URL + "/sports" // Get the API URL from the env
                console.log(apiUrl);
                const response = await fetch(apiUrl, {
                    method: 'GET',
                    headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                    },
                });
                const data = await response.json();
                const required_sport = data.filter((cursport)=>cursport.name==sport)
                const req_id = required_sport[0]._id;
                setSportsId(req_id);
                console.log(centreInfo);
                console.log(`${sport}: ${req_id}`)
                const all_current_courts = centreInfo.courts
                const cur_sport_courts = all_current_courts.filter((cur_court)=>cur_court.sport==req_id)
                console.log(cur_sport_courts);
                setCourts(cur_sport_courts);
            }
            catch(err){

            }
        }
        getCourts();
    },[sport])

    useEffect(() => {
        if(centres)
        {
            fillSports();

        }
    }, [centres]);

    const confirmHandler = async(e) => {
        e.preventDefault();
        console.log('confirm');
        console.log(CourtId);
        console.log(centerid);
        console.log(sportsId);
        console.log(date);
        console.log(slotTime);
        try {
            const apiUrl = process.env.REACT_APP_API_URL + `/bookings`; // Get the API URL from the env
            console.log(apiUrl);
            const response = await fetch(apiUrl, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify({  // Use JSON.stringify() here
                centre_id: centerid,
                sport_id: sportsId,
                court_id: CourtId,
                slot_time: slotTime,
                slot_date: date
            })
            });
            const data = await response.json();
          } catch (error) {
            console.error('Error:', error);
          }
        setBlur(false);
        setPopUp(false);
    };

    const cancelHandler = (e) => {
        e.preventDefault();
        console.log('cancel');
        setBlur(false);
        setPopUp(false);
    };

    useEffect(()=>{ 
        const getBookings = async(e)=>{
            try {
                const apiUrl = process.env.REACT_APP_API_URL + `/bookings/sports-centre-date`; // Get the API URL from the env
                console.log(apiUrl);
                const response = await fetch(apiUrl, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                  },
                  body: JSON.stringify({  // Use JSON.stringify() here
                    centre: centerid,
                    sport: sportsId,
                    slot_date: date
                })
                });
                const data = await response.json();
                console.log(data);
                if(response.status == 200)
                {   
                  
                    setBookings(data.bookings);
                }
              } catch (error) {
                console.error('Error:', error);
              }
        };
        getBookings();
    },[sportsId, date, centerid])
    

    return (
        <>
            <div className='pages' style={{ filter: blur ? 'blur(5px)' : 'none' }}>
                <SideBar/>
                <h2 style={{position: 'absolute', borderRadius: '2px', outline: '1px solid black', padding: '10px', top: '10px', left: 'max(25%, 280px)'}}>{`Schedule for ${centrename}`}</h2>
                <div style={{position: 'absolute', height: '30px', outline: '1px solid black', top: '100px', left: 'max(25%, 280px)'}}>
                    <Dropdown selectedRole={date} setSelectedRole={setDate} roles={dates} message="Select Date"/>
                </div>
                <div style={{position: 'absolute', height: '30px', outline: '1px solid black', top: '100px', left: 'max(50%, 450px)'}}>
                    {sports && <Dropdown selectedRole={sport} setSelectedRole={setSport} roles={sports} message="Select Sport"/>}
                </div>
                {courts && <Court bookings = {bookings} courts = {courts} setCourtId={setCourtid}/>}
            </div>
            {popup && <PopUp confirmHandler={confirmHandler} CancelHandler={cancelHandler} text="Are you sure you want to book?" />}
        </>
    );
};

export default DashBoardPage;
