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
    <>
      <Navbar setStep={setStep} city={city} />
      <div className="ui divider"></div>
      <Weather setStep={setStep} city={city} lat={lat} long={long} />
      <div className="ui divider"></div>
      <Chat />
    </>
  );
}

export default WeatherPage;
