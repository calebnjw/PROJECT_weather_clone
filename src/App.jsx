/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import jwt from 'jwt-decode';
import swal from 'sweetalert';

import LoginForm from './pages/login.jsx';
import SignUpForm from './pages/signup.jsx';
import FavouritePage from './pages/favouritePage.jsx';
import WeatherPage from './pages/weatherPage.jsx';

import Cloud from './sun_cloud_icon.png';

export default function App() {
  // controlling page that app is on
  const [step, setStep] = useState(1);

  // user information that is shared across the app
  const [userToken, setUserToken] = useState(localStorage.getItem('token'));
  const [config, setConfig] = useState('');
  const [userId, setUserId] = useState(0);
  const [username, setUsername] = useState('');

  // search query and search results
  const [query, setQuery] = useState('');
  const [citiesList, setCitiesList] = useState([]);

  // city information to get weather data
  const [city, setCity] = useState('Singapore');
  const [lat, setLat] = useState('1.28967');
  const [long, setLong] = useState('103.85007');

  // value changes when setting favourites
  const [updateFav, setUpdateFav] = useState(1);

  const handleLogoutSubmit = () => {
    localStorage.removeItem('token');
    swal('You are logged out!');
    setStep(1);
  };

  useEffect(() => {
    if (localStorage.getItem('token') !== null) {
      setUserToken(localStorage.getItem('token'));
    }
  }, [step]);

  useEffect(() => {
    console.log('SETTING CONFIG FROM USER TOKEN', userToken);
    if (userToken !== null) {
      setUserId(jwt(userToken).id);
      setUsername(jwt(userToken).username);
      setConfig({
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
    }
  }, [userToken]);

  return (
    <Container>
      { step >= 3
      && <>
        {/* Menu bar */}
        <div className="ui huge text menu">
          <div className="item">
            <img src={Cloud} alt="cloud-logo" />
          </div>
          <div className="right menu">
            <div className="item">
              <div className="ui teal button" onClick={handleLogoutSubmit}>
                <i className="sign-out icon"></i>
                Logout
              </div>
            </div>
          </div>
        </div>
      </> }

      {step === 1 && <LoginForm
        setStep={setStep} />}

      {step === 2 && <SignUpForm
        setStep={setStep} />}

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
        long={long} />}
    </Container>
  );
}
