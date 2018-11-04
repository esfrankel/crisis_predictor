import React from 'react';
import "../App.css";

const CountryItem = ({ country }) => {
  //console.log(country);
  let PNG;
  try {
    PNG = require('./Images/' + country.Alpha2.toLowerCase() + '.png');
  }
  catch(e) {

  }
  
  return (

      <a href="https://www.google.com">
      <div className="country-item">
      <img className="icon" src={PNG} alt={"meaningful description"}/>
      <div className="countryCaption"> { country.Country.toUpperCase() } </div>
      <div className="countryMetrics"> Economic Scale: { country.AvgDiffScore} </div>

    </div>
    </a>
  )
};

export default CountryItem;