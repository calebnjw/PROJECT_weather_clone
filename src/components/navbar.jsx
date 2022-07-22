import React, { useEffect, useState } from 'react';
import { Button } from 'semantic-ui-react';
import axios from 'axios';

// sign up form component
function Navbar(props) {
  const {
    setStep, config, updateFav, setUpdateFav, city, lat, long,
  } = props;

  const [star, setStar] = useState(false);

  const previousPage = () => setStep(3);

  const favourite = async () => {
    const response = await axios.post(
      '/user/new-favourite',
      {
        star, city, lat, long,
      },
      config,
    );

    const { success } = response.data;
    console.log(success);

    if (star) {
      setStar(false);
    } else {
      setStar(true);
    }

    if (success) {
      setUpdateFav(updateFav + 1);
    }
  };

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
