import React from 'react';
import ReactDOM from 'react-dom';
const axios = require('axios');

// Stateful Component
// render game status and grid to index page
// keep track of game status, current player, grid configuration
// bind click handler to pass down to cells in the grid
// click handler fills empty slot in the grid with a new disc, updates state
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameStatus: null,
      currentPlayerIsRed: true, // red player starts by default
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
    if (this.state.gameStatus === null) {
      var rowIndex = -1;
      // at specified column index, check for null slot starting from bottom row
      for (let i = this.state.grid.length - 1; i >= 0; i--) {
        if (this.state.grid[i][colIndex] === null) {
          rowIndex = i;
          break;
        }
      }
      // if null slot found, make new grid with slot filled, check game status
      // if game is continuing set state to switch to next player, otherwise to update game status
      if (rowIndex > -1) {
        var newGrid = this.state.grid.slice();
        newGrid[rowIndex][colIndex] = (this.state.currentPlayerIsRed) ? 'R' : 'Y';
        var newCurrentPlayer = !this.state.currentPlayerIsRed;
        var newGameStatus = null;
        if (checkForTie(newGrid)) {
          newGameStatus = 'tie';
          newCurrentPlayer = !newCurrentPlayer;
        }
        if (checkForWin(rowIndex, colIndex, newGrid)) {
          newGameStatus = 'win';
          newCurrentPlayer = !newCurrentPlayer;
        }
        this.setState({
          gameStatus: newGameStatus,
          currentPlayerIsRed: newCurrentPlayer,
          grid: newGrid
        });
      }
    } 
  }
}

// Functional Components
// render each cell of the grid, with a red/yellow color if filled
// click handler invoked with column index of a cell
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
// check every cell of the grid, starting from the bottom row
// if any cell is null return false, otherwise return true
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

var checkForWin = function(rowIndex, colIndex, grid) {
  return colWin(colIndex, grid); // || rowWin(rowIndex, grid) || minDiagWin(rowIndex, colIndex, grid) || majDiagWin(rowIndex, colIndex, grid);
};

var colWin = function(colIndex, grid) {
  var rowIndexWinCombos = [
    [0, 1, 2, 3],
    [1, 2, 3, 4],
    [2, 3, 4, 5]
  ];
  var colWin = false;
  for (let i = 0; i < rowIndexWinCombos.length; i++) {
    var rowIndexes = rowIndexWinCombos[i];
    var redFourInAColumn = grid[rowIndexes[0]][colIndex] === 'R' &&
      grid[rowIndexes[1]][colIndex] === 'R' &&
      grid[rowIndexes[2]][colIndex] === 'R' &&
      grid[rowIndexes[3]][colIndex] === 'R';
    if (redFourInAColumn) colWin = true;
    var yellowFourInAColumn = grid[rowIndexes[0]][colIndex] === 'Y' &&
      grid[rowIndexes[1]][colIndex] === 'Y' &&
      grid[rowIndexes[2]][colIndex] === 'Y' &&
      grid[rowIndexes[3]][colIndex] === 'Y'
    if (yellowFourInAColumn) colWin = true;
  }
  return colWin;
};
// var rowWin = function(rowIndex, grid) {};
// var minDiagWin = function(grid) {};
// var majDiagWin = function(grid) {};

// Render game to the DOM
ReactDOM.render(<Game />, document.getElementById('app'));
