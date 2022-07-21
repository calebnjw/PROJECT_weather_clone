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
    // WEATHER_CODES,
    // data,
    // u,

  } = props;
  const [showFavourites, setShowFavourites] = useState([]);
  const [userId, setUserId] = useState(localStorage.getItem('token').userId);

  useEffect(
    async () => {
      const getData = await axios.get('/user/favourites');
      console.log('get data:', getData);
      //       // const test = [
      //       //   {
      //       //     user_id: 1,
      //       //     city: 'Singapore',
      //       //     lat: '1.28967',
      //       //     long: '103.85007',
      //       //   },
      //       //   {
      //       //     user_id: 1,
      //       //     city: 'Singapore',
      //       //     lat: '1.28967',
      //       //     long: '103.85007',
      //       //   },
      //       //   {
      //       //     user_id: 1,
      //       //     city: 'Singapore',
      //       //     lat: '1.28967',
      //       //     long: '103.85007',
      //       //   },
      //       //   {
      //       //     user_id: 1,
      //       //     city: 'Singapore',
      //       //     lat: '1.28967',
      //       //     long: '103.85007',
      //       //   },
      //       // ];
      //       // { WEATHER_CODES[data.weathercode] }
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
