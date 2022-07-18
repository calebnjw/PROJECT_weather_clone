import React, { useState, useEffect } from 'react';
import {
  Button, Checkbox, Form, Step,
} from 'semantic-ui-react';

import useAxiosFunction from '../hooks/useAxiosFunction.js';
import axios from '../apis/openMeteo.js';
import Navbar from './navbar.jsx';

// sign up form component
function Weather(props) {
  const {
    setStep, city, lat, long,
  } = props;

  const [weather, error, loading] = useAxiosFunction();
  console.log('first weather', weather);

  const [weatherData, setWeatherData] = useState();

  // const getData = () => {
  //   axiosFetch({
  //     axiosInstance: axios,
  //     method: 'GET',
  //     url: `/v1/forecast?latitude=${lat}&longitude=${long}&daily=temperature_2m_max,temperature_2m_min&current_weather=true&timezone=Asia%2FSingapore`,
  //   });
  // };

  useEffect(() => {
    // getData();

    if (!loading) {
      console.log('setting weather data');
      setWeatherData(weather);
    }
  }, []);

  console.log('weather', weatherData);

  return (
    <>
      {!loading && !error && weatherData
        && <p>there's something in the weather</p>
      }
      {!loading && !error && !weather
        && <div className='chat-box'>
          <p>I'm here to tell you about our great weather!</p>
          <p>Don't like what you're seeing? Try refreshing, and see if anything changes.</p>
          <button>Refresh</button>
        </div>
      }
    </>
  );
}

export default Weather;
