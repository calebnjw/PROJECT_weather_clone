import React, { useState, useEffect } from 'react';
import { Card } from 'semantic-ui-react';
import axios from 'axios';

import FavouriteCity from './favouriteCity.jsx';

// component for displaying favourited cities
const DisplayFavourites = (props) => {
  const {
    setStep,
    citiesList,
    setCitiesList,
    setCity,
    setLat,
    setLong,
    updateFav,
    config,
    userId,

  } = props;
  const [showFavourites, setShowFavourites] = useState([]);

  const getData = async () => {
    const result = await axios.post(
      '/user/get-favourites',
      { userId },
      config,
    );
    if (result.data.locations) {
      return result.data.locations;
    }
    return [];
  };

  useEffect(async () => {
    if (userId > 0) {
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
  }, [updateFav]);

  return (
    <Card.Group>
      {showFavourites}
    </Card.Group>
  );
};

export default DisplayFavourites;
