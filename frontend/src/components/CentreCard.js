import React, { useState } from 'react';
import Sports from './Sports';

function CentreCard({ centre }) {
  const [selected, setSelected] = useState(false);

  return (
    <div className="card text-center h-100">
      <div className="card-body" onClick={() => setSelected(!selected)}>
        <h5 className="card-title">{centre.name}</h5>
        <p className="card-text">Click to view available sports</p>
      </div>
      {selected && <Sports centre={centre} />}
    </div>
  );
}

export default CentreCard;
