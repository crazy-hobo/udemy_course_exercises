import React, {Component} from 'react';
import CountryOptions from './CountryOptions';
import {shuffle} from './Shuffle';
import './CountryGame.css'

class CountryGame extends Component {
  constructor(props){
    super(props);
    this.state = {
      countries: [],
      options: [],
      correctAns: undefined,
      flag: '',
      correctName: undefined
    }
  } 
  componentDidMount(){
    fetch('https://restcountries.eu/rest/v2/all')
    .then(resp => resp.json())
    .then(countries => {
      const options = this._options(countries);
      const flag = countries[this.state.correctAns].flag;
      const correctName = countries[this.state.correctAns].name;
      this.setState({countries, options, flag, correctName})
    })
  }
  _options(countries){
    const correctAns = Math.floor(Math.random()*countries.length);
    this.setState({correctAns});
    let randCountry;
    const options = [correctAns];
    let _loopOptions = () => { //check if randCountry already in options:
      for (let i = 0; i < options.length; i++){ //loop through options
        //check if an option is the same as randCountry
        while (randCountry === options[i] || randCountry === correctAns){
          randCountry = Math.floor(Math.random()*countries.length); //create new random number
          _loopOptions();  //recheck all options if a new option is set, because we don't know if the new option is the same as one of the previous options.
        }
      }
    }
    for (let i = 0; i < 4; i++) { //create 5 options 
      randCountry = Math.floor(Math.random()*countries.length); //create new random number
      _loopOptions() //check if randCountry is already in options
      options.push(randCountry);
    }
    return shuffle(options);
  }
  render(){
    const {flag} = this.state;
    //add four options to render. 
    //use a new component to add options to render. 
    return(
      <main>
        {/* show 4 options */}
        <CountryOptions 
          options = {this.state.options}
          countries = {this.state.countries}
          correctAns = {this.state.correctAns}
          correctName = {this.state.correctName}
        />
        {/* Show flag image */}
        <img className='flag' src={flag} />
      </main>
    );
  }
}

export default CountryGame;