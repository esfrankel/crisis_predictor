import React from 'react';
import CountryItem from './CountryItem';

const CountryList = (props) => {
  const countryItems = props.countries.map((country) => {
    return <CountryItem key={country.id} country={country} />
  });

  return (
    <div className="country-list">{countryItems}</div>
  );
};

export default CountryList;