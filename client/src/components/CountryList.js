import React from 'react';
import CountryItem from './CountryItem';

class CountryList extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const countryItems = {};

    for (var i = 0; i < this.props.state.filtered.length; i++ ) {
      var country = this.props.state.filtered[i];


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
      return <CountryItem key={country.Id} country={country}  onCountryChange={this.props.onCountryChange} onStateChange={this.props.onStateChange}/>
    });

    return (
      <div className="country-list">{renderedItems}</div>
    );
  }
}
export default CountryList;
