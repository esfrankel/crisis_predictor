import React from 'react';
import "../App.css";

class CountryItem extends React.Component {
  handleClick = () => {
    this.props.onCountryChange(this.props.country.name);
    this.props.onStateChange(true);
  }
  render() {
    return (
      <button className="country-item" onClick={this.handleClick}>
        <img className="icon" src={this.props.country.url} alt={"meaningful description"}/>
        <div className="countryCaption"> { this.props.country.name.toUpperCase() } </div>
      </button>
    );
  }
}

export default CountryItem;
