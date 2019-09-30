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

  handleClick(row, column) {
    var newArrangement = this.getNewArrangement(row, column);
    this.setState({
      currentPlayerIsX: !this.state.currentPlayerIsX,
      arrangement: newArrangement
    })
  }

  render() {
    return (
      <div>
        <div>Current player: {(this.state.currentPlayerIsX) ? 'X' : 'O'}</div>
        <div>{this.state.arrangement.map((row, index) => <Row key={index} values={row} row={index} onclick={this.handleClick} /> )}</div>
      </div>
    );
  }

  getNewArrangement(row, column) {
    var newArrangement = this.state.arrangement.slice();
    var value = (this.state.currentPlayerIsX) ? 'X' : 'O';
    newArrangement[row][column] = value;
    return newArrangement;
  }

  // function to check if there is a winner

}

export default Board;