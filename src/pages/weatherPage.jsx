import React, { useState, useEffect } from "react";
import { Grid } from "semantic-ui-react";

import Chat from "../components/chat.jsx";
import Navbar from "../components/navbar.jsx";
import Weather from "../components/weather.jsx";
import Cloud from "../sun_cloud_icon.png";
import swal from "sweetalert";

// sign up form component
function WeatherPage(props) {
  const {
    setStep,
    config,
    userId,
    username,
    updateFav,
    setUpdateFav,
    city,
    lat,
    long,
  } = props;

  const handleLogoutSubmit = () => {
    localStorage.removeItem("token");
    swal("You are logged out!");
    setStep(1);
  };

  return (
    <Grid padded={true}>
      {/* Menu bar */}
      <div className="ui huge top fixed text menu">
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
      
      <Navbar
        setStep={setStep}
        config={config}
        updateFav={updateFav}
        setUpdateFav={setUpdateFav}
        city={city}
        lat={lat}
        long={long}
      />
      <Weather setStep={setStep} lat={lat} long={long} />
      <Chat config={config} username={username} city={city} />
    </Grid>
  );
}

export default WeatherPage;
