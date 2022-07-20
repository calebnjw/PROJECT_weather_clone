import React, { useState, useEffect } from 'react';

// component for displaying favourited cities
const DisplayFavourites = (props) => {
  const { 
    setStep, 
    citiesList, 
    setCitiesList, 
    setCity, 
    setLat, 
    setLong 
  } = props;

  // axios get user's jwt token
const result = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current_weather=true&timezone=Asia%2FSingapore`);
};


