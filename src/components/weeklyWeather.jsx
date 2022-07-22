import React from 'react';
import { DateTime } from 'luxon';

// sign up form component
function WeeklyWeather(props) {
  const { data, u } = props;

  const dailyTemp = data.time.map((date, i) => {
    const dt = DateTime.fromISO(date);
    return (
      <div key={date} className="daily-weather-item">
        <div className="row">
          <div>
            <i className="yellow huge sun outline icon"></i>
          </div>
          <div className="row">
          {dt.toFormat('cccc')}
          </div>
          <div className="row" style={{ paddingTop: '20px', paddingRight: '5px' }}>
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
            <hr />
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
