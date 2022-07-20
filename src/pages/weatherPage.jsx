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

  const [userToken, setUserToken] = useState({});

  useEffect(() => {
    setUserToken(localStorage.getItem('token'));
    console.log('userToken', userToken);
  }, [userToken]);

  return (
    <div className='ui padded grid'>
      <Navbar setStep={setStep} city={city} userId={1}/>
      <Weather lat={lat} long={long} />
      <Chat city={city} />
    </div>
  );
}

export default WeatherPage;
