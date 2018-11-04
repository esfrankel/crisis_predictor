import React from 'react';
import "../App.css";

const CountryItem = ({ country }) => {
  console.log(country);
  
  return (

      <a href="https://www.google.com">
      <div className="country-item">
      <img className="icon" src={country.url} alt={"meaningful description"}/>
      <div className="countryCaption"> { country.name.toUpperCase() } </div>
    </div>
    </a>
  )
};

export default CountryItem;