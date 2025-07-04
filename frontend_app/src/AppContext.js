// AppContext.js
import React, { createContext, useState, useContext } from 'react';

// Create the context
const AppContext = createContext();

// Create a provider component
export const AppProvider = ({ children }) => {
  const [date, setDate] = useState('');
  const [sport, setSport] = useState('');
  const [slotTime, setSlotTime] = useState('');
  const [blur, setBlur] = useState(false);
  const [popup, setPopUp] = useState(false);
  const [centre, setCentre] = useState();

  return (
    <AppContext.Provider value={{ date, setDate, sport, setSport, slotTime, setSlotTime , blur, setBlur, popup, setPopUp, centre, setCentre}}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the context
export const useAppContext = () => {
  return useContext(AppContext);
};
