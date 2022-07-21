/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import { Container, Grid } from 'semantic-ui-react';
import jwt from 'jwt-decode';

import LoginForm from './pages/login.jsx';
import SignUpForm from './pages/signup.jsx';
import FavouritePage from './pages/favouritePage.jsx';
import WeatherPage from './pages/weatherPage.jsx';
// import weather from './SnowFlake.gif';

// import components
// import component from './components/component.jsx';

export default function App() {
  // controlling page that app is on
  const [step, setStep] = useState(1);

  // user information that is shared across the app
  const [userToken, setUserToken] = useState(localStorage.getItem('token'));
  const [config, setConfig] = useState('');
  const [userId, setUserId] = useState(0);
  const [username, setUsername] = useState('');

  // signup and login information
  const [signUp, setSignUp] = useState('');
  const [login, setLogin] = useState('');

  // search query and search results
  const [query, setQuery] = useState('');
  const [citiesList, setCitiesList] = useState([]);

  // city information to get weather data
  const [city, setCity] = useState('Singapore');
  const [lat, setLat] = useState('1.28967');
  const [long, setLong] = useState('103.85007');

  // value changes when setting favourites
  const [updateFav, setUpdateFav] = useState(1);

  useEffect(() => {
    console.log('WEATHER PAGE USE EFFECT');
    console.log('USER TOKEN', userToken);
    if (localStorage.getItem('token') !== null) {
      setUserToken(localStorage.getItem('token'));
      setUserId(jwt(userToken).id);
      setConfig({
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
    }
  }, []);

  return (
    <Container>
      <Grid padded={true} centered={true} >
        {step === 1 && <LoginForm
          setStep={setStep}
          setLogin={setLogin} />}

        {step === 2 && <SignUpForm
          setStep={setStep}
          setSignUp={setSignUp} />}

        {step === 3 && <FavouritePage
          setStep={setStep}
          config={config}
          userId={userId}
          username={username}
          setQuery={setQuery}
          query={query}
          citiesList={citiesList}
          setCitiesList={setCitiesList}
          setCity={setCity}
          setLat={setLat}
          setLong={setLong} />}

        {step === 4 && <WeatherPage
          setStep={setStep}
          config={config}
          userId={userId}
          username={username}
          updateFav={updateFav}
          setUpdateFav={setUpdateFav}
          city={city}
          lat={lat}
          long={long}
          updateFav={updateFav}
          setUpdateFav={setUpdateFav} />}
      </Grid>
    </Container>
  );
}
