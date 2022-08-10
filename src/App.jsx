/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import jwt from 'jwt-decode';

import MenuBar from './components/menuBar.jsx';
import LoginForm from './pages/login.jsx';
import SignUpForm from './pages/signup.jsx';
import FavouritePage from './pages/favouritePage.jsx';
import WeatherPage from './pages/weatherPage.jsx';

export default function App() {
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

  useEffect(() => {
    if (localStorage.getItem('token') !== null) {
      setUserToken(localStorage.getItem('token'));
    }
  }, []);

  useEffect(() => {
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
    <BrowserRouter>
      <Routes>
        <Route path='/'>
          <Route
            index
            element={<LoginForm />} />
          <Route
            path='login'
            element={<LoginForm />} />
          <Route
            path='signup'
            element={<SignUpForm />} />
          <Route
            path='app'
            element={<MenuBar />} >
            <Route
              path='favourites'
              element={
                <FavouritePage
                  config={config}
                  userId={userId}
                  username={username}
                  setQuery={setQuery}
                  query={query}
                  citiesList={citiesList}
                  setCitiesList={setCitiesList}
                  setCity={setCity}
                  setLat={setLat}
                  setLong={setLong} />
              } />
            <Route
              path=':city'
              element={
                <WeatherPage
                  config={config}
                  userId={userId}
                  username={username}
                  updateFav={updateFav}
                  setUpdateFav={setUpdateFav}
                  city={city}
                  lat={lat}
                  long={long} />
              } />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
