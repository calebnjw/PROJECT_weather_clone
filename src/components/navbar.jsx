import React, { useState } from 'react';
import { Button } from 'semantic-ui-react';

// sign up form component
function Navbar(props) {
  const {
    setStep, city, lat, long,
  } = props;

  const previousPage = () => setStep(3);
  const favourite = () => console.log('favourited');

  return (
    <div className='navbar'>
      <Button type='button' icon onClick={previousPage}>
        <i className="fa-solid fa-arrow-left"></i>
      </Button>
      <h1>{city}</h1>
      <Button type='button' icon onClick={favourite}>
        <i className="fa-regular fa-star"></i>
      </Button>
    </div>
  );
}

export default Navbar;
