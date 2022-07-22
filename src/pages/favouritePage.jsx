import React, { useState, useEffect } from 'react';
import {
  Search, Grid, Step, Label,
} from 'semantic-ui-react';
import Fuse from 'fuse.js';
import swal from 'sweetalert';
import FavouriteDisplay from '../components/favouriteDisplay.jsx';
import cities from '../cities.json';
import Cloud from '../sun_cloud_icon.png';

const FavouritePage = (props) => {
  const {
    setStep,
    query,
    setQuery,
    citiesList,
    setCitiesList,
    setCity,
    setLat,
    setLong,
    updateFav,
    userId,
    config,

  } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResult] = useState([]);

  // fuse search
  const citiesAPI = cities;
  const options = {
    minMatchCharLength: 3,
    threshold: 0.1,
    distance: 3,
    keys: ['name'],
  };
  const fuse = new Fuse(citiesAPI, options);

  useEffect(() => {
    setCitiesList(fuse.search(query));
    setIsLoading(false);
  }, [query]);

  const handleOnSearch = (event) => {
    setIsLoading(true);
    setQuery(event.target.value);
  };
  // sending values via states and redirect to setStep(4)
  const showLocation = (city, lat, long) => {
    setStep(4);
    setCity(city);
    setLat(lat);
    setLong(long);
  };
  // rending template for dropdown list
  const resultRenderer = ({ item }) => (
      <p>
        {item.name}
        {'\t'}
        <Label
          content={
            <small>
              {item.lat.toFixed(2)}, {item.lng.toFixed(2)}
            </small>
          }
        />
      </p>
  );

  const handleLogoutSubmit = () => {
    localStorage.removeItem('token');
    swal('You are logged out!');
    setStep(1);
  };

  const handleHomePage = () => {
    setStep(3);
  };

  return (
    <>
      {/* Menu bar */}
      <div className="ui huge top fixed text menu">
        <div className="item">
          <img src={Cloud} alt="cloud-logo" onClick={handleHomePage}/>
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

      {/* Search bar */}
      <Grid.Column width={16}>
        <div className="search-bar-input">
          <Search
            type="text"
            value={query}
            onSearchChange={handleOnSearch}
            placeholder="Search location here"
            fluid
            loading={isLoading}
            onResultSelect={(e, data) => {
              const { name, lat, lng } = data.result.item;
              showLocation(name, lat, lng);
            }}
            resultRenderer={resultRenderer}
            results={citiesList}
          />
        </div>
        <h4>Favourites</h4>
        <br/>
        <FavouriteDisplay
          setStep={setStep}
          updateFav={updateFav}
          setCity={setCity}
          setLat={setLat}
          setLong={setLong}
          userId={userId}
          config={config}/>
      </Grid.Column>
    </>
  );
};

export default FavouritePage;
