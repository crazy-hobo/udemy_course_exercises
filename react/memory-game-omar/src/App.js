import './App.css';
import React, { Component } from 'react';
import Card from './Card';

const colors = ['red', 'red', 'blue', 'blue', 'green', 'green', 'orange', 'orange', 'pink', 'pink', 'purple', 'purple', 'magenta', 'magenta'];

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

const randColors = shuffle(colors);

class App extends Component {
  static defaultProps = {
    colors: [...randColors]
  };
  constructor(props) {
    super(props);
    this.state = { 
      cardsClicked: 0,
      cardClassHidden: "card card-hidden",
      card1: true,
      card2: true,
      card3: true,
      card4: true,
      card5: true,
      card6: true,
      card7: true,
      card8: true,
      card9: true,
      card10: true,
      card11: true,
      card12: true,
      card13: true,
      card14: true
    }
    this.clickCounter = this.clickCounter.bind(this);
  }
  clickCounter() {
    if (this.state.cardsClicked === 2) {
      this.setState({cardsClicked: 1},
      () => {console.log(this.state.cardsClicked)});  
    } else if (this.state.cardsClicked < 2) {
      this.setState({
        cardsClicked: this.state.cardsClicked + 1
      }, () => {console.log(this.state.cardsClicked)})
    }
  }
  spawnCards () {
    const NUM_CARDS = 14;
    const clickCounter = this.clickCounter;
    let CardsArr = [];
    for (let i = 0; i < NUM_CARDS; i++) {
      CardsArr.push(
        <Card 
          cardClass={this.state.cardClassHidden}
          key={i} 
          cardColor={this.props.colors[i]} 
          numberClicks={clickCounter}
        />
      )
    }
    return(CardsArr);
  }
  render () {
    return(
      <div>
        {this.spawnCards()}
      </div>
    );
  };
}

export default App;
