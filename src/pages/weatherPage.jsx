import React, { useState, useEffect } from 'react';
import { Grid } from 'semantic-ui-react';

import Chat from '../components/chat.jsx';
import Navbar from '../components/navbar.jsx';
import Weather from '../components/weather.jsx';

// sign up form component
function WeatherPage(props) {
  const {
    setStep, config, userId, username, updateFav, setUpdateFav, city, lat, long,
  } = props;

  return (
    <Grid padded={true} >
      <Navbar
        setStep={setStep}
        config={config}
        updateFav={updateFav}
        setUpdateFav={setUpdateFav}
        city={city}
        lat={lat}
        long={long} />
      <Weather
        lat={lat}
        long={long} />
      <Chat
        config={config}
        username={username}
        city={city} />
    </Grid>
  );
}

export default WeatherPage;
