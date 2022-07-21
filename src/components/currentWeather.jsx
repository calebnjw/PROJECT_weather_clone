import React, { useState, useEffect } from "react";
import { Button, Checkbox, Form, Step } from "semantic-ui-react";
import Cloud from "../sun_cloud_icon.png";
import swal from "sweetalert";

// sign up form component
function CurrentWeather(props) {
  const { data, u, setStep } = props;

  const [WEATHER_CODES, setWEATHER_CODES] = useState({
    0: "Clear Sky",
    1: "Mainly Clear Sky",
    2: "Partly Cloudy",
    3: "Overcast",
    45: "Foggy",
    48: "Rime Fog",
    51: "Light Drizzle",
    53: "Moderate Drizzle",
    55: "Dense Drizzle",
    56: "Feezing Light Drizzle",
    57: "Feezing Dense Drizzle",
    61: "Slight Rain",
    63: "Moderate Rain",
    65: "Heavy Rain",
    66: "Light Freezing Rain",
    67: "Heavy Freezing Rain",
    71: "Slight Snowfall",
    73: "Moderate Snowfall",
    75: "Heavy Snowfall",
    77: "Snow Grains",
    80: "Slight Rain Showers",
    81: "Moderate Rain Showers",
    82: "Heavy Rain Showers",
    85: "Slight Snow Showers",
    86: "Heavy Snow Showers",
    95: "Thunderstorm",
    96: "Thunderstorm with slight hail",
    99: "Thunderstorm with heavy hail",
  });

  const handleLogoutSubmit = () => {
    localStorage.removeItem("token");
    swal("You are logged out!");
    setStep(1);
  };

  return (
    <>
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

      <div className="ui stackable grid container current-weather">
        <div className="row">
        <div className="column">
            <h1>{data && data.temperature}{u}</h1>
            <h4>{data && WEATHER_CODES[data.weathercode]}</h4>
        </div>
        </div>
      </div>
    </>
  );
}

export default CurrentWeather;
