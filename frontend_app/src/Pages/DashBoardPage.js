import React, { useEffect } from 'react';
import SideBar from '../components/SideBar';
import InputBar from '../components/InputBar';
import Button from '../components/Button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NameComps from '../components/NameComps';

const DashBoardPage = () => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const [centres, setCentres] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchCentres = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL + "/centres"; // Get the API URL from the env
        console.log(apiUrl);
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });
        const data = await response.json();
        console.log(data.centres);
        if (response.status === 200) {
          setCentres(data.centres); // Set fetched data to state
          localStorage.setItem('centres', JSON.stringify(data.centres));
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchCentres();
  }, [token]); // Ensure token is passed as dependency

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const apiUrl = process.env.REACT_APP_API_URL + `/centres/${search}`; // Get the API URL from the env
      console.log(apiUrl);
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (response.status === 200) {
        setCentres(data.centres); // Update centres with search result
        localStorage.setItem('centres', JSON.stringify(data.centres));
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='pages'>
      <SideBar />
      <h1 style={{ position: 'absolute', top: '10px', left: 'max(25%, 280px)' }}>Create Bookings</h1>
      <form onSubmit={handleSearch}>
        <span
          style={{
            width: 'max(60%, 100px)',
            position: 'absolute',
            left: 'max(25%, 280px)',
            top: '100px',
            display: 'flex'
          }}
        >
          <InputBar type="text" placeholder="Enter centre or sport..." value={search} setFunc={setSearch} />
        </span>
        <span style={{ position: 'absolute', top: '90px', right: '70px', width: '100px', height: '35px' }}>
          <Button type="submit" text="search" color="rgb(64, 161, 239)" />
        </span>
      </form>
      <div style={{ fontWeight: "0", top: '200px', width: 'max(60%, 100px)', position: 'absolute', left: 'max(25%, 280px)', display: 'flex', flexDirection: 'column' }}>
        {
          centres && centres.map((e) => (
            <NameComps key={e.id} name={e.name} color='rgb(228,233,238)' navigate={`/dashboard/centre/${e.name}`} />
          ))
        }
      </div>
    </div>
  );
};

export default DashBoardPage;
