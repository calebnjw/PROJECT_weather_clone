import React from 'react';
import { DateTime } from 'luxon';

// sign up form component
function WeeklyWeather(props) {
  const { data, u } = props;

  const dailyTemp = data.time.map((date, i) => {
    const dt = DateTime.fromISO(date);
    return (
      <div key={date} className="daily-weather-item">
        <div>
          <h2>
          {dt.toFormat('ccc')}
          </h2>
          <div>
            <i className="yellow huge sun outline icon"></i>
          </div>
          <div className='high-low-temp'>
            <div>
              H:
              {data.temperature_2m_max[i].toFixed(0)}
              {u}
            </div>
            <div>
              L:
              {data.temperature_2m_min[i].toFixed(0)}
              {u}
            </div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="weekly-weather">
      {data && dailyTemp}
    </div>
  );
}

export default WeeklyWeather;
