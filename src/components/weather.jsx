import React, { useState, useEffect } from 'react';
import {
  Button, Checkbox, Form, Step,
} from 'semantic-ui-react';
import axios from 'axios';

import CurrentWeather from './currentWeather.jsx';
import WeeklyWeather from './weeklyWeather.jsx';

// sign up form component
function Weather(props) {
  const {
    setStep, city, lat, long,
  } = props;

  const [weatherData, setWeatherData] = useState();
  const [u, setU] = useState('°C');

  const getData = async () => {
    const result = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&daily=temperature_2m_max,temperature_2m_min&current_weather=true&timezone=Asia%2FSingapore`);

    return result.data;
  };

  // this use effect is to get stuff
  useEffect(async () => {
    const tempData = await getData();
    setWeatherData(tempData);
  }, [lat, long]);

  // map data into different divs and stuff here.
  // watch for changes to weather data.
  // then map stuff if weatherdata is updated and not undefined.
  useEffect(() => {
    if (weatherData) {
      setU(weatherData.daily_units.temperature_2m_min);

      // console.log('all weather data', weatherData);
      console.log('current weather', weatherData.current_weather);
      console.log('daily weather', weatherData.daily);
      // console.log('units', weatherData.daily_units.temperature_2m_min);
    }
  }, [weatherData]);

  return (
    <div className='weather-app'>
      { weatherData && <CurrentWeather data={weatherData.current_weather} u={u} /> }
      { weatherData && <WeeklyWeather data={weatherData.daily} u={u} /> }
    </div>
  );
}

export default Weather;
