import React from 'react';
import "../App.css";

class CountryItem extends React.Component {
  handleClick = () => {
    this.props.onCountryChange(this.props.country.Country);
    this.props.onStateChange(true);
  }
  render() {
    let PNG;
    try {
      PNG = require('./Images/' + this.props.country.Alpha2.toLowerCase() + '.png');
    }
    catch(e) {

    }
    return (
      <button className="country-item" onClick={this.handleClick}>
        <img className="icon" src={PNG} alt={"meaningful description"}/>
          <div className="countryCaption"> { this.props.country.Country.toUpperCase() } </div>
          <div className="countryMetrics"> Economic Scale: { this.props.country.AvgDiffScore} </div>

      </button>
    );
  }
}

export default CountryItem;
