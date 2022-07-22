import React from 'react';

import Chat from '../components/chat.jsx';
import Navbar from '../components/navbar.jsx';
import Weather from '../components/weather.jsx';

// sign up form component
function WeatherPage(props) {
  const {
    setStep,
    config,
    username,
    updateFav,
    setUpdateFav,
    city,
    lat,
    long,
  } = props;

  return (
    <>
      <Navbar
        setStep={setStep}
        config={config}
        updateFav={updateFav}
        setUpdateFav={setUpdateFav}
        city={city}
        lat={lat}
        long={long}
      />
      <Weather setStep={setStep} lat={lat} long={long} />
      <hr />
      <Chat config={config} username={username} city={city} />
    </>
  );
}

export default WeatherPage;
