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
      currentPlayerIsX: true,
      gameStatus: null
    };
    this.handleClick = this.handleClick.bind(this)
  }

  render() {
    var message;
    if (this.state.gameStatus === null) {
      message = `Current player: ${(this.state.currentPlayerIsX) ? 'X' : 'O'}`;
    } else if (this.state.gameStatus === 'draw') {
      message = 'Game status: draw';
    } else {
      message = `Game status: winner is ${(this.state.currentPlayerIsX) ? 'X' : 'O'}`;
    }
    return (
      <div>
        <div>{message}</div>
        <div>{this.state.arrangement.map((row, index) => <Row key={index} values={row} row={index} onclick={this.handleClick} /> )}</div>
        <div><button onClick={() => {this.resetBoard()}}>Reset board</button></div>
      </div>
    );
  }

  handleClick(row, column) {
    if (this.state.gameStatus === null) { // game still in progress
      var newArrangement = this.getNewArrangement(row, column);
      var newGameStatus = null;
      var newCurrentPlayer = this.state.currentPlayerIsX;
      // update newGameStatus if there is a win or draw
      if (this.checkForWin(newArrangement)) {
        newGameStatus = 'win';
      } else if (this.checkForDraw(newArrangement)) {
        newGameStatus = 'draw';
      }
      if (newGameStatus === null) {
        var newCurrentPlayer = !this.state.currentPlayerIsX;
      }
      this.setState({
        currentPlayerIsX: newCurrentPlayer,
        arrangement: newArrangement,
        gameStatus: newGameStatus
      });
    }
  }

  resetBoard() {
    this.setState({
      arrangement: [
        [null, null, null],
        [null, null, null],
        [null, null, null]
      ],
      currentPlayerIsX: true,
      gameStatus: null
    })
  }

  getNewArrangement(row, column) {
    var newArrangement = this.state.arrangement.slice();
    var value = (this.state.currentPlayerIsX) ? 'X' : 'O';
    newArrangement[row][column] = value;
    return newArrangement;
  }

  checkForWin(arrangement) {
    var winningCombos = [
      // rows
      [[0,0], [0,1], [0,2]],
      [[1,0], [1,1], [1,2]],
      [[2,0], [2,1], [2,2]],
      // columns
      [[0,0], [1,0], [2,0]],
      [[0,1], [1,1], [2,1]],
      [[0,2], [1,2], [2,2]],
      // diagonals
      [[0,0], [1,1], [2,2]],
      [[2,0], [1,1], [0,2]]
    ];
    for (var i = 0; i < winningCombos.length; i++) {
        var winningCombo = winningCombos[i];
        var count = 0;
        for (var j = 0; j < 3; j++) {
            var winningComboRow = winningCombo[j][0];
            var winningComboColumn = winningCombo[j][1];
            var player = (this.state.currentPlayerIsX) ? 'X' : 'O';
            if (arrangement[winningComboRow][winningComboColumn] === player) {
                count++;
            }
        }
        if (count === 3) {
            return true;
        }
    }
    return false;
  }

  checkForDraw(arrangement) {
    for (var row = 0; row < arrangement.length; row++) {
      for (var column = 0; column < 3; column++) {
          if (arrangement[row][column] === null) {
            return false;
          }
      }
    }
    return true;
  }

}

export default Board;