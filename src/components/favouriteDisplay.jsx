import React, { useState, useEffect } from 'react';
import { Card } from 'semantic-ui-react';
import axios from 'axios';

import FavouriteCity from './favouriteCity.jsx';

// component for displaying favourited cities
const DisplayFavourites = (props) => {
  const {
    setStep,
    updateFav,
    setCity,
    setLat,
    setLong,
    config,
  } = props;
  const [showFavourites, setShowFavourites] = useState([]);

  const getData = async () => {
    console.log('GET DATA IN FAVOURITE DISPLAY');
    const result = await axios.get(
      '/user/get-favourites',
      config,
    );
    if (result.data.locations) {
      return result.data.locations;
    }
    return [];
  };

  useEffect(async () => {
    if (config !== '') {
      const locations = await getData();
      setShowFavourites(locations.map((item) => (
        <FavouriteCity
          setStep={setStep}
          setCity={setCity}
          setLat={setLat}
          setLong={setLong}
          data={item}
          key={item.city} />
      )));
    }
  }, [config, updateFav]);

  return (
    <Card.Group>
      {showFavourites}
    </Card.Group>
  );
};

export default DisplayFavourites;
