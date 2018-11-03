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
          url: us
        }, 
        {
          id: 2,
          name: "Italy",
          url: it
        }, 
      {
        id: 3,
        name: "Korea",
        url: kr

      }],
      filtered : [{
        id: 1,
        name: "USA",
        url: us
      }, 
      {
        id: 2,
        name: "Italy",
        url: it
      }, 
    {
      id: 3,
      name: "Korea",
      url: kr

    }]
    }

    this.handleTermChange = this.handleTermChange.bind(this);

}

  handleTermChange(term) {
    // var first = term.charAt(0).toUpperCase();
    // var res = term.substr(1).toLowerCase();
    // var term = first + res;
  //  onChange = (event) => {
  //    const s = event.target.value
  //    console.log(s);
      
      const filtered = this.state.countries.filter((country) => country.name.includes(term.charAt(0).toUpperCase() + term.substr(1).toLowerCase()))
      console.log(term.charAt(0).toUpperCase() + term.substr(1).toLowerCase())
      this.setState({
          filtered: filtered
      })
  //}

    // change this to be essentially the select 

    // const url = `https://www.google.com/maps/embed/v1/place?key=AIzaSyA_Eq2me4Sgq1Ky03MDCWbA7YpKbshfm4E&q={term.replace(//g, '+')}`;
    // request.get(url, function(err, res) {
    //     console.log(res.body.data[0]);
    // });  
  }

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     curr_item: "",
  //     items: []
  //   };
  //   this.handleItem = this.handleItem.bind(this);
  //   this.addItem = this.addItem.bind(this);
  // }
  // handleItem(event) {
  //   this.setState({
  //     curr_item: event.target.value
  //   });
  // }
  // addItem() {
  //   if(this.state.curr_item !== ''){
  //     this.setState({
  //       curr_item: "",
  //       items: this.state.items.concat(this.state.curr_item)
  //     });
  //   }
  // }
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
