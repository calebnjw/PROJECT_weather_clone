import React, { useState } from 'react';
import WEATHER_CODES from '../data/weatherCodes.json';

// sign up form component
function CurrentWeather(props) {
  const { data, u } = props;

  return (
    <div className="current-weather">
      <h1>{data && data.temperature}{u}</h1>
      <h3>{data && WEATHER_CODES[data.weathercode]}</h3>
    </div>
  );
}

export default CurrentWeather;
