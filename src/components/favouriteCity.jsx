import React, { useEffect, useState } from 'react';
import { Card } from 'semantic-ui-react';

// sign up form component
function FavouriteCity(props) {
  const {
    data, setStep, setCity, setLat, setLong,
  } = props;
  const { city, lat, long } = data;

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
  const [temperature, setTemperature] = useState('');
  const [weatherDesc, setWeatherDesc] = useState('');

  const getData = async () => {
    const data = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&daily=weathercode&current_weather=true&timezone=Asia%2FSingapore`);
    return data.data.current_weather;
  };

  useEffect(async () => {
    const { temperature: temp, weathercode } = await getData();
    console.log(temp, weathercode);
    setTemperature(temp);
    setWeatherDesc(WEATHER_CODES[weathercode]);
  }, [data]);

  const showLocation = (city, lat, long) => {
    setStep(4);
    setCity(city);
    setLat(lat);
    setLong(long);
  };

  return (
    <Card
      fluid
      city={city}
      lat={lat}
      long={long}
      onClick={(e, data) => {
        const { city, lat, long } = data;
        showLocation(city, lat, long);
      }} >
      <Card.Content>
        <Card.Header content={city} />
        <Card.Description content={`${temperature}°C`} />
        <Card.Description content={`${weatherDesc}`} />
      </Card.Content>
      <Card.Content extra>
        <Card.Meta content={`${Number(lat).toFixed(2)}, ${Number(long).toFixed(2)}`} />
      </Card.Content>
    </Card>
  );
}

export default FavouriteCity;
