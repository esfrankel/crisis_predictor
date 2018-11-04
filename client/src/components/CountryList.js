import React from 'react';
import CountryItem from './CountryItem';

class CountryList extends React.Component {
  constructor(props) {
    super(props);
    this.countryItems = this.props.state.countries;
  }

  render() {
    return (
      <div className="country-list">{this.countryItems.map((country) => {
        return <CountryItem key={country.id} country={country} onCountryChange={this.props.onCountryChange} onStateChange={this.props.onStateChange}/>})}
      </div>
    )
  }
}
export default CountryList;
