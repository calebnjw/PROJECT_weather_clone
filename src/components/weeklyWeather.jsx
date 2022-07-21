import React, { useState, useEffect } from "react";
import { Button, Checkbox, Form, Step } from "semantic-ui-react";
import { DateTime } from "luxon";

// sign up form component
function WeeklyWeather(props) {
  const { data, u } = props;

  const dailyTemp = data.time.map((date, i) => {
    const dt = DateTime.fromISO(date);
    return (
      <>
      <div className="weekly-weather-container">
        <div className="row" style={{ paddingTop: "20px" }}>
        <div key={date}></div>
          <i class="yellow huge sun outline icon"></i>
        </div>
        <div className="row">
        {dt.toFormat("cccc")}
        </div>
        <div className="row" style={{ paddingTop: "20px", paddingRight: "5px"}}>
        Max: {data.temperature_2m_max[i]}
        {u}
        <br />
        Min: {data.temperature_2m_min[i]}
        {u}
      <hr />
        </div>
      </div>
      </>
    );
  });

  return <div className="weekly-weather">{data && dailyTemp}</div>;
}

export default WeeklyWeather;
