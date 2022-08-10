import React, { useState, useEffect } from 'react';
import {
  Outlet,
  useNavigate,
} from 'react-router-dom';
import swal from 'sweetalert';

import Cloud from '../sun_cloud_icon.png';

// component for displaying favourited cities
const MenuBar = (props) => {
  const navigate = useNavigate();

  const {
    setStep,
  } = props;

  const handleLogoutSubmit = () => {
    localStorage.removeItem('token');
    swal('You are logged out!');
    navigate('/login');
  };

  return (
    <>

    <div className="ui huge text menu">
      <div className="item">
        <img src={Cloud} alt="cloud-logo" />
      </div>
      <div className="right menu">
        <div className="item">
          <div className="ui teal button" onClick={handleLogoutSubmit}>
            <i className="sign-out icon"></i>
            Logout
          </div>
        </div>
      </div>
    </div>
    <Outlet />
    </>
  );
};

export default MenuBar;
