import React from 'react';
import ReactDOM from 'react-dom';
const axios = require('axios');

// Stateful Component
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameStatus: null,
      currentPlayerIsRed: true,
      grid: [
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null]
      ]
    }
    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    var message = 'Game in progress..';
    if (this.state.gameStatus === 'tie') {
      message = 'Game over - it was a tie!';
    }
    if (this.state.gameStatus === 'win') {
      message = `Game over - ${(this.state.currentPlayerIsRed) ? 'red' : 'yellow'} won!`;
    }
    return (
      <div>
        <div>{message}</div>
        <table border="1">
          <tbody>
          <Grid onclick={this.handleClick} grid={this.state.grid}/>
          </tbody>
        </table>
      </div>
    );
  }

  handleClick(colIndex) {
    var rowIndex = -1;
    // at specified column index, check for null slot starting from bottom row
    for (let i = this.state.grid.length - 1; i >= 0; i--) {
      if (this.state.grid[i][colIndex] === null) {
        rowIndex = i;
        break;
      }
    }
    // if null slot found, setState to fill slot and switch to next player
    if (rowIndex > -1) {
      var newGrid = this.state.grid.slice();
      newGrid[rowIndex][colIndex] = (this.state.currentPlayerIsRed) ? 'R' : 'Y';
      var newCurrentPlayer = !this.state.currentPlayerIsRed;
      var newGameStatus = null;
      if (checkForTie(newGrid)) {
        newGameStatus = 'tie';
        newCurrentPlayer = !newCurrentPlayer;
      }
      // if (checkForWin(newGrid)) {
      //   gameStatus = 'win';
      //   newCurrentPlayer = !newCurrentPlayer;
      // }
      this.setState({
        gameStatus: newGameStatus,
        currentPlayerIsRed: newCurrentPlayer,
        grid: newGrid
      });
    }
  }
}

// Functional Components
function Grid(props) {
  return props.grid.map((row, rowIndex) => <Row key={rowIndex} row={row} onclick={props.onclick} /> );
}

function Row(props) {
  var colors = {'Y': 'yellow', 'R': 'red', null: 'white'};
  return (
    <tr>
      {props.row.map((cell, colIndex) => <td key={colIndex} onClick={() => {props.onclick(colIndex)}} bgcolor={colors[cell]}>O</td>)}
    </tr>
  );
}

// Helper functions
var checkForTie = function(grid) {
  var isTied = true;
  for (let i = grid.length - 1; i >= 0; i--) {
    for (let j = 0; j < grid[i].length; j++) {
      if(grid[i][j] === null) {
        isTied = false;
      }
    }
  }
  return isTied;
}

// var checkForWin = function(grid) {
//   var isWon = true;
//   return isWon;
// }

// Rendering game to the DOM
ReactDOM.render(<Game />, document.getElementById('app'));
