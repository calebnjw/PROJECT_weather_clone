import React, { useState, useEffect } from 'react';
import { Search, Label } from 'semantic-ui-react';
import Fuse from 'fuse.js';
import FavouriteDisplay from '../components/favouriteDisplay.jsx';
import cities from '../cities.json';

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
    config,
  } = props;

  const [isLoading, setIsLoading] = useState(false);

  // fuse search
  const options = {
    minMatchCharLength: 3,
    threshold: 0.3,
    distance: 2,
    keys: ['name'],
  };

  const fuse = new Fuse(cities, options);

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
    <div>
      {item.name}
      {' '}
      <Label
        content={
          <small>
            {item.lat.toFixed(2)}, {item.lng.toFixed(2)}
          </small>
        } />
    </div>
  );

  return (
    <>
      {/* Search bar */}
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
      <h2>Favourites</h2>
      <FavouriteDisplay
        setStep={setStep}
        updateFav={updateFav}
        setCity={setCity}
        setLat={setLat}
        setLong={setLong}
        config={config}/>
    </>
  );
};

export default FavouritePage;
