import React, { useState, useEffect } from 'react';
import { Card } from 'semantic-ui-react';
import axios from 'axios';

import FavouriteCity from './favouriteCity.jsx';

// component for displaying favourited cities
const DisplayFavourites = (props) => {
  const {
    updateFav,
    setCity,
    setLat,
    setLong,
    config,
  } = props;
  const [favourites, setFavourites] = useState([]);

  const getData = async () => {
    const { data } = await axios.get(
      '/user/get-favourites',
      config,
    );
    console.log('DADADDSDSDADADAD', data);
    console.log('LOCATIONS', data.locations);
    if (data.locations) {
      setFavourites(data.locations);
    }
  };

  useEffect(() => {
    if (config !== '') {
      getData();
    }
  }, [config, updateFav]);

  return (
    <Card.Group>
      {favourites.map((item) => (
        <FavouriteCity
          setCity={setCity}
          setLat={setLat}
          setLong={setLong}
          data={item}
          key={item.city} />
      ))}
    </Card.Group>
  );
};

export default DisplayFavourites;
