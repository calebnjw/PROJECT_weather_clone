import React, { useState, useEffect } from 'react';
import {
  Button, Checkbox, Form, Step,
} from 'semantic-ui-react';
import { DateTime } from 'luxon';

// sign up form component
function WeeklyWeather(props) {
  const { data } = props;

  const dailyTemp = data.time.map((date, i) => {
    const dt = DateTime.fromISO(date);
    return (
      <div key={date}>
        {dt.toFormat('cccc')}
        <br />
        Max: {data.temperature_2m_max[i]}
        <br />
        Min: {data.temperature_2m_min[i]}
      </div>
    );
  });

  return (
    <div className='weekly-weather'>
      { data && dailyTemp }
    </div>
  );
}

export default WeeklyWeather;
