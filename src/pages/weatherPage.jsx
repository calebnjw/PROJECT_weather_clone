import React, { useState, useEffect } from 'react';
import { Grid, GridRow } from 'semantic-ui-react';

import Chat from '../components/chat.jsx';
import Navbar from '../components/navbar.jsx';
import Weather from '../components/weather.jsx';

// sign up form component
function WeatherPage(props) {
  const {
    setStep, city, lat, long,
  } = props;

  return (
    <div className='ui padded grid'>
      <Navbar setStep={setStep} city={city} />
      <Weather lat={lat} long={long} />
      <Chat />
    </div>
  );
}

export default WeatherPage;
