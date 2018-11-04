import React from "react";
import "./App.css";
import SearchBar from './components/SearchBar';
import CountryList from './components/CountryList';
import CountryModal from './components/CountryModal';
import it from "./components/Images/it.png"
import us from "./components/Images/us.png"
import kr from "./components/Images/kr.png"
import logo from "./components/Images/PF.png"

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        countries: [{
          id: 1,
          name: "Usa",
          url: us,
          economicScale: 5
        },
        {
          id: 2,
          name: "Italy",
          url: it,
          economicScale: 5
        },
      {
        id: 3,
        name: "Korea",
        url: kr,
        economicScale: 7

      },
      {
        id: 4,
        name: "Mexico",
        url: kr,
        economicScale: 7

      },
      {
        id: 5,
        name: "Afghanistan",
        url: kr,
        economicScale: 7

      },
      {
        id: 6,
        name: "Japan",
        url: kr,
        economicScale: 7

      }],



      filtered :[{
        id: 1,
        name: "Usa",
        url: us,
        economicScale: 5
      },
      {
        id: 2,
        name: "Italy",
        url: it,
        economicScale: 5
      },
    {
      id: 3,
      name: "Korea",
      url: kr,
      economicScale: 7

    },
    {
      id: 4,
      name: "Mexico",
      url: kr,
      economicScale: 7

    },
    {
      id: 5,
      name: "Afghanistan",
      url: kr,
      economicScale: 7

    },
    {
      id: 6,
      name: "Japan",
      url: kr,
      economicScale: 7

    }],
    countryToggled: "null",
    modalToggled: true,
    }

    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleCountryChange = this.handleCountryChange.bind(this);

}

  handleTermChange(term) {
      const filtered = this.state.countries.filter((country) => country.name.includes(term.charAt(0).toUpperCase() + term.substr(1).toLowerCase()))
      console.log(term.charAt(0).toUpperCase() + term.substr(1).toLowerCase())
      this.setState({
          filtered: filtered
      })
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
        <img src={logo} className="app-logo"
        alt = "logo" />
        <h2 className="title"> Preflict</h2>
        <h3 className="caption">A global risk assessment.</h3>
        </div>

        <SearchBar onTermChange={this.handleTermChange} />

        <CountryList state={this.state} onStateChange={this.handleModalToggle} onCountryChange={this.handleCountryChange}/>
        <CountryModal modalToggled={this.state.modalToggled} countryToggled={this.state.countryToggled} onStateChange={this.handleModalToggle}/>

      </div>

    );
  }
}

export default App;
