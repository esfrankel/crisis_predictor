import React from "react";
import "./App.css";
import SearchBar from './components/SearchBar';
import CountryList from './components/CountryList';
import CountryModal from './components/CountryModal';
import logo from "./components/Images/PF.png"
import CSVParse from "./CSVParse.js"


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        countries: [],
        filtered: [],
        countryToggled: "null",
        modalToggled: false,
      }
      CSVParse('stocks1').then((data) => {
        this.setState({countries : data, filtered : data});
        console.log(data);
      });
      }

  handleTermChange = (term) => {
      const filtered = this.state.countries.filter((country) => country.Country.includes(term.charAt(0).toUpperCase() + term.substr(1).toLowerCase()))
      console.log(term.charAt(0).toUpperCase() + term.substr(1).toLowerCase())
      this.setState({
          filtered: filtered
      })
      console.log(this.state.filtered);
  }

  handleCountryChange = (country) => {
    this.setState({
      countryToggled: country
    })
  }

  handleModalToggle = (boolean) => {
    this.setState({
      modalToggled: boolean
    })
  }

  render() {
    return (
      <div className="app">
        <div className="app-header">
          <img src={logo} className="app-logo" alt = "logo" />
          <h2 className="title"> conflict.io</h2>
          <h3 className="caption">A global risk assessment.</h3>
          <SearchBar className="search" onTermChange={this.handleTermChange} />
        </div>
        <CountryList state={this.state} onStateChange={this.handleModalToggle} onCountryChange={this.handleCountryChange}/>
        <CountryModal state={this.state} modalToggled={this.state.modalToggled} countryToggled={this.state.countryToggled} onStateChange={this.handleModalToggle}/>
      </div>
    );
  }
}


export default App;
