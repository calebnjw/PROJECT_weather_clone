import React, { useState, useEffect } from 'react';
import { Grid } from 'semantic-ui-react';

import Chat from '../components/chat.jsx';
import Navbar from '../components/navbar.jsx';
import Weather from '../components/weather.jsx';

// sign up form component
function WeatherPage(props) {
  const {
    setStep, updateFav, setUpdateFav, city, lat, long,
  } = props;

  const [userToken, setUserToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    setUserToken(localStorage.getItem('token'));
    console.log('userToken', userToken);
  }, []);

  return (
    <Grid padded={true} >
      <Navbar
        setStep={setStep}
        userToken={userToken}
        updateFav={updateFav}
        setUpdateFav={setUpdateFav}
        city={city}
        lat={lat}
        long={long} />
      <Weather
        lat={lat}
        long={long} />
      <Chat
        city={city}
        userToken={userToken} />
    </Grid>
  );
}

export default WeatherPage;
