import React from 'react';
import "../App.css";
//import picture from './Images/us.png'

const CountryItem = ({ country }) => {
  console.log(country);
  
  return (
    // <li>
    //   {/* <img src={image.country.url} />  */}
    //   <img src={picture} alt={"meaningful description"}/>
    //   </li>
      <a href="https://www.google.com">
      <div className="country-item">
      <img className="icon" src={country.url} alt={"meaningful description"}/>
      
    </div>
    </a>
  )
};

export default CountryItem;