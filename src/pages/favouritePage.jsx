import React, { useState, useEffect } from 'react';
import {
  Search, Grid, Step,
} from 'semantic-ui-react';
import Fuse from 'fuse.js';
import cities from 'cities.json';

const FavouritePage = (props) => {
  const {
    setStep,
    query, setQuery,
    citiesList, setCitiesList,
    setCity, setLat, setLong,
  } = props;

  const [isLoading, setIsLoading] = useState(false);

  const citiesAPI = cities;
  const options = {
    minMatchCharLength: 3,
    threshold: 0.1,
    distance: 3,
    keys: [
      'name',
    ],
  };

  const fuse = new Fuse(citiesAPI, options);

  useEffect(() => {
    setCitiesList(fuse.search(query));
    setIsLoading(false);
  }, [query]);

  const handleOnSearch = (event) => {
    setIsLoading(true);
    setQuery(event.target.value);
    console.log('input:', query);
  };

  useEffect(() => {
    if (citiesList.length > 0) {
      console.log('full list', citiesList);
      console.log(Object.keys(citiesList[0]));
      console.log(citiesList[0].item);
    }
  }, [citiesList]);

  // const handleResultSelect = () => {
  //   setStep(4);
  //   setCity();
  //   setLat();
  //   setLong();
  // };

  return (
  // <div className='search-bar-container'>
      <>
        <Grid.Row width={6}>
          <div className='search-bar-input'>
            <Search
            type='text'
            value={query}
            onSearchChange={handleOnSearch}
            placeholder='Search location here'
            fluid
            loading={isLoading}
            // onResultSelect={this.handleResultSelect}
            // onSearchChange={_.debounce(this.handleSearchChange, 500, {
              // leading: true,
            // })}
            results={citiesList}
            // value={value}
            />
          </div>
        </Grid.Row>
        <Grid.Row width={6} className='location-list'>
          <h4>List of Location</h4>
          <ol>
          {citiesList ? citiesList.map((city) => {
            console.log('city:', city.item.name);
            const {
              country, name, lat, lng,
            } = city.item;
            return (
                <li key={name} className='location-list'>
                  Country: {country}
                  <br></br>
                  Name: {name}
                  <br></br>
                  Latitude: {lat}
                  <br></br>
                  Langitude: {lng}
                </li>
            );
          }) : null};
          </ol>

            {/* <pre style={{ overflowX: 'auto' }}>
              {JSON.stringify(this.state, null, 2)}
            </pre> */}
            {/* <Header>Options</Header> */}
            {/* <pre style={{ overflowX: 'auto' }}>
              {JSON.stringify(source, null, 2)}
            </pre> */}
        </Grid.Row>
      </>
  // </div>
  );
};

export default FavouritePage;
