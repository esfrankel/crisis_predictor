import React from "react";
import "./App.css";
// import Item from "./Item";
import SearchBar from './components/SearchBar';
import CountryList from './components/CountryList';
//import "./components/Images"
// how to reference specific pictures in images folder
// import request from 'superagent';
// import Select from "./components/Select";
//import Select from './components/Select'
import it from "./components/Images/it.png"
import us from "./components/Images/us.png"
import kr from "./components/Images/kr.png"


//how to do a reset button

class App extends React.Component {
  constructor(props) {
    super(props);

    // how to get countries without hard coding???
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

    }]
    }

    this.handleTermChange = this.handleTermChange.bind(this);

}

  handleTermChange(term) {  
      const filtered = this.state.countries.filter((country) => country.name.includes(term.charAt(0).toUpperCase() + term.substr(1).toLowerCase()))
      console.log(term.charAt(0).toUpperCase() + term.substr(1).toLowerCase())
      this.setState({
          filtered: filtered
      }) 
  }

  render() {
    return (
      <div className="app">
        <SearchBar onTermChange={this.handleTermChange} />

        <CountryList countries={this.state.filtered} />
    
      </div>

      // <div className="todo-container">
      //   <div className="input-container">
      //     <input className="todo-input" placeholder="Search..." value={this.state.curr_item} onChange={this.handleItem} />
      //     <button className="todo-submit" onClick={this.addItem}>Enter</button>
      //   </div>
      //   <ul className="todo-item-list">
      //     {this.state.items.map((item, index) => (
      //       <Item key={index} text={item} />
      //     ))}
      //   </ul>
      // </div>
    );
  }
}

export default App;
