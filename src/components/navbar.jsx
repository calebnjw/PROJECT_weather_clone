import React, { useEffect, useState } from 'react';
import { Button } from 'semantic-ui-react';
import axios from 'axios';

// sign up form component
function Navbar(props) {
  const {
    setStep, config, userId, updateFav, setUpdateFav, city, lat, long,
  } = props;

  const [star, setStar] = useState(false);
  // const [userId, setUserId] = useState(0);
  // const [config, setConfig] = useState('');

  const previousPage = () => setStep(3);

  // useEffect(() => {
  //   if (userToken === null) {
  //     setUserId(0);
  //   } else {
  //     // jwt is from jwt-decode

  //   }
  // }, [userToken]);

  const favourite = async () => {
    let success;
    console.log('posting to backend!');
    if (star) {
      success = await axios.post(
        '/user/new-favourite',
        {
          star, userId, city, lat, long,
        },
        config,
      );
      setStar(false);
    } else {
      success = await axios.post(
        '/user/new-favourite',
        {
          star, userId, city, lat, long,
        },
        config,
      );
      setStar(true);
    }
    if (success.data.success) {
      setUpdateFav(updateFav + 1);
    }
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
