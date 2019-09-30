import React from 'react';
import Row from './Row';

class Board extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      arrangement: [
        [null, null, null],
        [null, null, null],
        [null, null, null]
      ],
      currentPlayerIsX: true
    };
    this.handleClick = this.handleClick.bind(this)
  }

  render() {
    return (
      <div>
        <div>Current player: {(this.state.currentPlayerIsX) ? 'X' : 'O'}</div>
        <div>{this.state.arrangement.map((row, index) => <Row key={index} values={row} row={index} onclick={this.handleClick} /> )}</div>
        <div><button onClick={() => {this.resetBoard()}}>Reset board</button></div>
      </div>
    );
  }

  handleClick(row, column) {
    var newArrangement = this.getNewArrangement(row, column);
    this.setState({
      currentPlayerIsX: !this.state.currentPlayerIsX,
      arrangement: newArrangement
    })
  }

  resetBoard() {
    this.setState({
      currentPlayerIsX: true,
      arrangement: [
        [null, null, null],
        [null, null, null],
        [null, null, null]
      ]
    })
  }

  getNewArrangement(row, column) {
    var newArrangement = this.state.arrangement.slice();
    var value = (this.state.currentPlayerIsX) ? 'X' : 'O';
    newArrangement[row][column] = value;
    return newArrangement;
  }

  checkForWinner() {
    this.state.arrangement;
  }

}

export default Board;