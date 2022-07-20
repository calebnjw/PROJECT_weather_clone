import React, { useEffect, useState } from 'react';
import { Button } from 'semantic-ui-react';
import jwt from 'jwt-decode';
import axios from 'axios';

// sign up form component
function Navbar(props) {
  const {
    setStep, userToken, updateFav, setUpdateFav, city, lat, long,
  } = props;

  const [star, setStar] = useState(false);
  const [userId, setUserId] = useState('');

  const previousPage = () => setStep(3);

  useEffect(() => {
    if (Object.keys(userToken).length > 0) {
      setUserId(jwt(userToken).id);
      console.log(userId);
    }
  }, [userToken]);

  const favourite = async () => {
    if (star) {
      setStar(false);
      console.log('posting to backend!');
      await axios.post('/user/new-favourite', {
        star, userId, city, lat, long,
      });
    } else {
      setStar(true);
      console.log('posting to backend!');
      await axios.post('/user/new-favourite', {
        star, userId, city, lat, long,
      });
    }
    setUpdateFav(updateFav + 1);
  };

  return (
    <div className='navbar'>
      <Button type='button' icon onClick={previousPage}>
        <i className="fa-solid fa-arrow-left"></i>
      </Button>
      <h1>{city}</h1>
      <Button type='button' icon onClick={favourite}>
        {!star
          ? <i className="fa-regular fa-star"></i>
          : <i className="fa-solid fa-star"></i>}
      </Button>
    </div>
  );
}

export default Navbar;
