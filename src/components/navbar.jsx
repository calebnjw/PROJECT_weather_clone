import React, { useState, useEffect } from 'react';
import { Button } from 'semantic-ui-react';
import axios from 'axios';

// sign up form component
function Navbar(props) {
  const {
    setStep, config, updateFav, setUpdateFav, city, lat, long,
  } = props;

  // star is the state of the star on location page
  const [star, setStar] = useState(false);

  /**
   * Returns user to search / favourites page
   */
  const previousPage = () => setStep(3);

  /**
   * Gets favourited cities from backend
   * @returns list of locations, or empty array if there are none
   */
  const getData = async () => {
    console.log('GET DATA IN NAVBAR');
    const result = await axios.get(
      '/user/get-favourites',
      config,
    );
    if (result.data.locations) {
      return result.data.locations;
    }
    return [];
  };

  /**
   * Changes whether a city favourite by sending city data
   * to backend and changing state of star
   */
  const favourite = async () => {
    // post city data and star state to backend
    const response = await axios.post(
      '/user/new-favourite',
      {
        star, city, lat, long,
      },
      config,
    );

    const { success } = response.data;

    // toggle between state of star
    if (star) {
      setStar(false);
    } else {
      setStar(true);
    }

    if (success) {
      setUpdateFav(updateFav + 1);
    }
  };

  // to check if city is favourited already
  useEffect(async () => {
    if (config !== '') {
      const locations = await getData();
      const favouriteCities = [];

      locations.forEach((location) => {
        favouriteCities.push(location.city);
      });

      // if city is in favourites, star should be true
      if (favouriteCities.includes(city)) {
        setStar(true);
      }
    }
  }, [config, updateFav]);

  return (
    <div className='navbar'>
      <Button className="ui grey button" type='button' icon onClick={previousPage}>
        <i className="fa-solid fa-arrow-left"></i>
      </Button>
      <h2>{city}</h2>
      <Button className="ui grey button" type='button' icon onClick={favourite}>
        {!star
          ? <i className="fa-regular fa-star"></i>
          : <i className="fa-solid fa-star"></i>}
      </Button>
    </div>
  );
}

export default Navbar;
