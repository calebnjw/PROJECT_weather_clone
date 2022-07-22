import React, { useState } from 'react';

// sign up form component
function CurrentWeather(props) {
  const { data, u } = props;

  const [WEATHER_CODES, setWEATHER_CODES] = useState({
    0: 'Clear Sky',
    1: 'Mainly Clear Sky',
    2: 'Partly Cloudy',
    3: 'Overcast',
    45: 'Foggy',
    48: 'Rime Fog',
    51: 'Light Drizzle',
    53: 'Moderate Drizzle',
    55: 'Dense Drizzle',
    56: 'Feezing Light Drizzle',
    57: 'Feezing Dense Drizzle',
    61: 'Slight Rain',
    63: 'Moderate Rain',
    65: 'Heavy Rain',
    66: 'Light Freezing Rain',
    67: 'Heavy Freezing Rain',
    71: 'Slight Snowfall',
    73: 'Moderate Snowfall',
    75: 'Heavy Snowfall',
    77: 'Snow Grains',
    80: 'Slight Rain Showers',
    81: 'Moderate Rain Showers',
    82: 'Heavy Rain Showers',
    85: 'Slight Snow Showers',
    86: 'Heavy Snow Showers',
    95: 'Thunderstorm',
    96: 'Thunderstorm with slight hail',
    99: 'Thunderstorm with heavy hail',
  });

  return (
    <div className="current-weather">
      <h1>{data && data.temperature}{u}</h1>
      <h3>{data && WEATHER_CODES[data.weathercode]}</h3>
    </div>
  );
}

export default CurrentWeather;
