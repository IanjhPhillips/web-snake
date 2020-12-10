import React from 'react'
import './App.css';
import P5Wrapper from 'react-p5-wrapper';

import sketch from './components/sketch.js';




export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.score = this.score.bind(this)
    this.state = {
      score: 0,
    };
  };

  score (s) {
    this.setState({score: s})
  }

  render() {
    return (
      <div>
        <P5Wrapper
          sketch={sketch}
          getCoords={(s) => this.score}
        />
        <p>Score = {this.state.score}</p>
      </div>
    )
  }
}
