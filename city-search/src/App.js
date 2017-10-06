import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

function Zip(props) {
  return (
      <div className="panel panel-default">
        <div className="panel-body">
          <div> {props.data} </div>
        </div>
      </div>
    );
}

function CitySearchField(props) {
  return (
      <div>
          <label><b>City Name:</b></label>
          <input type="text" value={props.value} onChange={props.handleChange} />
      </div>
    )
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state={
      city: "",
      zipCode: [],
      states: [],
    };
    this.cityNameChange=this.cityNameChange.bind(this);
  }

  cityNameChange(event) {
    const city = event.target.value.toUpperCase();
    this.setState({
      city: city
    });

    fetch("http://ctp-zip-api.herokuapp.com/city/" + city)
    .then(function(response){
      if(response.ok){
        return response.json();
      }
    })

    .then((jsonData) => {
      try {
          const zipCode = jsonData.map((obj) => <Zip data={obj} />);
          this.setState({
            zipCode: zipCode
          })
      }
      catch(err) {
          console.log("City Not Found");
      }
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>City Search</h2>
        </div>

        <CitySearchField value={this.state.city} handleChange={this.cityNameChange} />
        <div>
            {this.state.zipCode}
            {this.state.state}
        </div>

      </div>
    );
  }
}

export default App;

