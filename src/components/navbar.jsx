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
  const [config, setConfig] = useState({});

  const previousPage = () => setStep(3);

  useEffect(() => {
    if (userToken === null) {
      setUserId(0);
    } else {
      setUserId(jwt(userToken).id);
      setConfig({
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
    }
  }, [userToken]);

  const favourite = async () => {
    let success;
    console.log('posting to backend!');
    if (star) {
      success = await axios.post('/user/new-favourite', {
        star, userId, city, lat, long,
      }, config);
      setStar(false);
    } else {
      success = await axios.post('/user/new-favourite', {
        star, userId, city, lat, long,
      }, config);
      setStar(true);
    }
    if (success.data.success) {
      setUpdateFav(updateFav + 1);
    }
  };

  return (
    <div className='navbar'>
      <Button className="ui grey button" type='button' icon onClick={previousPage}>
        <i className="fa-solid fa-arrow-left"></i>
      </Button>
      <h1 style={{ fontSize: "3rem"}}>{city}</h1>
      <Button className="ui grey button" type='button' icon onClick={favourite}>
        {!star
          ? <i className="fa-regular fa-star"></i>
          : <i className="fa-solid fa-star"></i>}
      </Button>
    </div>
  );
}

export default Navbar;
