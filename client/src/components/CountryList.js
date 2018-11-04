import React from 'react';
import CountryItem from './CountryItem';

const CountryList = (props) => {
  const countryItems = {};

  for (var i = 0; i < props.countries.length; i++ ) {
    var country = props.countries[i];

    if (countryItems[country.Country]) {
      if (country.Year > countryItems[country.Country].Year) {
        countryItems[country.Country] = country;
      }
    }
    else {
      countryItems[country.Country] = country;
    }
  }

  var renderedItems = Object.values(countryItems).map((country) => {
    return <CountryItem key={country.Id} country={country} />
  });

  return (
    <div className="country-list">{renderedItems}</div>
  );
};

export default CountryList;