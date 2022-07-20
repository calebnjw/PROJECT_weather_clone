/* eslint-disable max-len */
import React, { useState } from 'react';
import { Container, Grid } from 'semantic-ui-react';

import LoginForm from './pages/login.jsx';
import SignUpForm from './pages/signup.jsx';
import FavouritePage from './pages/favouritePage.jsx';
import WeatherPage from './pages/weatherPage.jsx';


export default function App() {
  const [step, setStep] = useState(3);
  const [signUp, setSignUp] = useState('');
  const [login, setLogin] = useState('');
  const [query, setQuery] = useState('');
  const [citiesList, setCitiesList] = useState([]);
  const [city, setCity] = useState('Singapore');
  const [lat, setLat] = useState('1.28967');
  const [long, setLong] = useState('103.85007');

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
          setQuery={setQuery}
          query={query}
          citiesList={citiesList}
          setCitiesList={setCitiesList}
          setCity={setCity}
          setLat={setLat}
          setLong={setLong} />}
        {step === 4 && <WeatherPage
          setStep={setStep}
          city={city}
          lat={lat}
          long={long} />}
      </Grid>
    </Container>
  );
}
