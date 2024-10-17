import React from 'react';
import { useNavigate } from 'react-router-dom';

function Sports({ centre }) {
  const navigate = useNavigate();

  // Mocked sports data for each centre
  const sports = [
    { id: 1, name: "Badminton" },
    { id: 2, name: "Cricket" },
    { id: 3, name: "Basketball" },
  ];

  const handleSportClick = (sport) => {
    // Redirect to the courts page for the selected sport
    navigate(`/centres/${centre.id}/sports/${sport.id}/courts`, { state: { sport } });
  };

  return (
    <div>
      <h4>Select a Sport at {centre.name}</h4>
      {sports.map((sport) => (
        <button
          key={sport.id}
          className="btn btn-primary btn-block mb-2"
          onClick={() => handleSportClick(sport)}
        >
          {sport.name}
        </button>
      ))}
    </div>
  );
}

export default Sports;
