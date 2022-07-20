import React, { useState, useEffect } from "react";
import { Search, Grid, Step, Label } from "semantic-ui-react";
import Fuse from "fuse.js";
import cities from "../cities.json";
import swal from "sweetalert";
import Cloud from "../sun_cloud_icon.png";

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
  } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResult] = useState([]);

  const citiesAPI = cities;
  const options = {
    minMatchCharLength: 3,
    threshold: 0.1,
    distance: 3,
    keys: ["name"],
  };

  const fuse = new Fuse(citiesAPI, options);

  useEffect(() => {
    setCitiesList(fuse.search(query));
    setIsLoading(false);
  }, [query]);

  const handleOnSearch = (event) => {
    setIsLoading(true);
    setQuery(event.target.value);
    console.log("input:", query);
  };

  const showLocation = (city, lat, long) => {
    setStep(4);
    setCity(city);
    setLat(lat);
    setLong(long);
  };

  const resultRenderer = ({ item }) => {
    console.log(item);

    return (
      <p>
        {item.name}
        {"\t"}
        <Label
          content={
            <small>
              {item.lat.toFixed(2)}, {item.lng.toFixed(2)}
            </small>
          }
        />
      </p>
    );
  };

  const handleLogoutSubmit = () => {
    localStorage.removeItem("token");
    swal("You are logged out!");
    setStep(1);
  };

  const handleHomePage = () => {
    setStep(3);
  }

  useEffect(() => {
    let temp;
    if (citiesList.length > 0) {
      console.log("full list", citiesList);
      console.log(Object.keys(citiesList[0]));
      console.log(citiesList[0].item);
      temp = citiesList.map((city) => {
        console.log("city:", city.item.name);
        const { country, name, lat, lng } = city.item;
        return (
          <li key={name} className="location-list">
            <h2>Name: {name}</h2>
            <br></br>
            Country: {country}
            <br></br>
            Latitude: {lat}
            <br></br>
            Langitude: {lng}
          </li>
        );
      });
    }
    setSearchResult(temp);
    console.log("SEARCH RESULTS", temp);
  }, [citiesList]);

  return (
    // <div className='search-bar-container'>
    <>
      {/* Menu bar */}
      <div className="ui huge top fixed text menu">
        <div className="item">
          <img src={Cloud} alt="cloud-logo" />
        </div>
        <a className="item" onClick={handleHomePage}>Home</a>
        <div className="right menu">
          <div className="item">
            <div className="ui teal button" onClick={handleLogoutSubmit}>
            <i class="sign-out icon"></i>
              Logout
            </div>
          </div>
        </div>
      </div>

      {/* Search bar */}
      <Grid.Row>
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
            // onSearchChange={_.debounce(this.handleSearchChange, 500, {
            //   leading: true,
            // })}
            resultRenderer={resultRenderer}
            results={citiesList}
          />
        </div>
      </Grid.Row>
      <Grid.Row className="location-list">
        <h4>Favourites</h4>
        {/* {favouriteCities} */}
      </Grid.Row>
    </>
  );
};

export default FavouritePage;
