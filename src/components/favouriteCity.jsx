import React, { useEffect, useState } from 'react';
import { Card } from 'semantic-ui-react';
import WEATHER_CODES from '../data/weatherCodes.json';

// sign up form component
function FavouriteCity(props) {
  const {
    data,
    setStep,
    setCity,
    setLat,
    setLong,
  } = props;
  const { city, lat, long } = data;

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
