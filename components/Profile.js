import React from 'react';
import CentreCard from './CentreCard';

function Profile({ role }) {
  // Mocked data for sports centers
  const centres = [
    { id: 1, name: "Indiranagar" },
    { id: 2, name: "Koramangala" },
    { id: 3, name: "Whitefield" },
    { id: 4, name: "Marathahalli" }
  ];

  return (
    <div className="container">
      <h2 className="text-center">Select a Centre</h2>
      <div className="row mt-4">
        {centres.map((centre) => (
          <div key={centre.id} className="col-md-4 mb-3">
            <CentreCard centre={centre} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Profile;
