import React, { useState, useEffect } from 'react';
import axios from 'axios';

// component for displaying favourited cities
const DisplayFavourites = (props) => {
  const {
    setStep,
    citiesList,
    setCitiesList,
    setCity,
    updateFav,
    config,
    userToken,
    userId,
  } = props;
  const [showFavourites, setShowFavourites] = useState([]);

  useEffect(
    async () => {
      const getData = await axios.get('/user/favourites');
      console.log('get data:', getData);
      // { WEATHER_CODES[data.weathercode] }
      const mapTest = getData.map((item) => (
          <div key={item.city}>
            {item.city}
            <br/>
            {item.lat}
            <br/>
            {item.long}
            </div>));
      setShowFavourites(mapTest);
    },
    [updateFav],
  );

  return (
      <div className='favourite-item'>
        {showFavourites}

    </div>
  );
};

export default DisplayFavourites;
