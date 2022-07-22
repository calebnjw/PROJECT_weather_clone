import React, { useState, useEffect } from 'react';
import axios from 'axios';

import CurrentWeather from './currentWeather.jsx';
import WeeklyWeather from './weeklyWeather.jsx';

// sign up form component
function Weather(props) {
  const {
    lat, long, setStep,
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

  useEffect(() => {
    if (weatherData) {
      setU(weatherData.daily_units.temperature_2m_min);
    }
  }, [weatherData]);

  return (
    <div className='weather-app'>
      { weatherData
        && <CurrentWeather data={weatherData.current_weather} setStep={setStep} u={u} /> }
      { weatherData
        && <WeeklyWeather data={weatherData.daily} u={u} /> }
    </div>
  );
}

export default Weather;
