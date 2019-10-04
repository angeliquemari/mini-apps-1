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
  return colWin(colIndex, grid) || rowWin(rowIndex, grid) || minDiagWin(rowIndex + colIndex, grid); // || majDiagWin(rowIndex, colIndex, grid);
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
var rowWin = function(rowIndex, grid) {
  var colIndexWinCombos = [
    [0, 1, 2, 3],
    [1, 2, 3, 4],
    [2, 3, 4, 5],
    [3, 4, 5, 6]
  ];
  var rowWin = false;
  for (let i = 0; i < colIndexWinCombos.length; i++) {
    var colIndexes = colIndexWinCombos[i];
    var redFourInARow = grid[rowIndex][colIndexes[0]] === 'R' &&
      grid[rowIndex][colIndexes[1]] === 'R' &&
      grid[rowIndex][colIndexes[2]] === 'R' &&
      grid[rowIndex][colIndexes[3]] === 'R';
    if (redFourInARow) rowWin = true;
    var yellowFourInARow = grid[rowIndex][colIndexes[0]] === 'Y' &&
      grid[rowIndex][colIndexes[1]] === 'Y' &&
      grid[rowIndex][colIndexes[2]] === 'Y' &&
      grid[rowIndex][colIndexes[3]] === 'Y'
    if (yellowFourInARow) rowWin = true;
  }
  return rowWin;
};
var minDiagWin = function(diagReference, grid) {
  // win not possible for diagonals with less than 4 cells
  if (diagReference < 3 || diagReference > 8) {
    return false;
  }
  var minDiagWin = false;
  var winCombos;
  // winCombos for each diagReference
  if (diagReference === 3) {
    winCombos = [
      [[3,0], [2,1], [1,2], [0,3]]
    ];
  }
  if (diagReference === 4) {
    winCombos = [
      [[4,0], [3,1], [2,2], [1,3]],
      [[3,1], [2,2], [1,3], [0,4,]]
    ];
  }
  if (diagReference === 5) {
    winCombos = [
      [[5,0], [4,1], [3,2], [2,3]],
      [[4,1], [3,2], [2,3], [1,4]],
      [[3,2], [2,3], [1,4], [0,5]]
    ];
  }
  if (diagReference === 6) {
    winCombos = [
      [[5,1], [4,2], [3,3], [2,4]],
      [[4,2], [3,3], [2,4], [1,5]],
      [[3,3], [2,4], [1,5], [0,6]]
    ];
  }
  if (diagReference === 7) {
    winCombos = [
      [[5,2], [4,3], [3,4], [2,5]],
      [[4,3], [3,4], [2,5], [1,6]]
    ];
  }
  if (diagReference === 8) {
    winCombos = [
      [[5,3], [4,4], [3,5], [4,6]]
    ];
  }
  for (let i = 0; i < winCombos.length; i++) {
    var indexes = winCombos[i];
    var redFourInAMinDiag = grid[indexes[0][0]][indexes[0][1]] === 'R' &&
      grid[indexes[1][0]][indexes[1][1]] === 'R' &&
      grid[indexes[2][0]][indexes[2][1]] === 'R' &&
      grid[indexes[3][0]][indexes[3][1]] === 'R';
    if (redFourInAMinDiag) minDiagWin = true;
    var yellowFourInAMinDiag = grid[indexes[0][0]][indexes[0][1]] === 'Y' &&
      grid[indexes[1][0]][indexes[1][1]] === 'Y' &&
      grid[indexes[2][0]][indexes[2][1]] === 'Y' &&
      grid[indexes[3][0]][indexes[3][1]] === 'Y';
    if (yellowFourInAMinDiag) minDiagWin = true;
  }
  return minDiagWin;
};
// var majDiagWin = function(rowIndex, colIndex, grid) {};

// Render game to the DOM
ReactDOM.render(<Game />, document.getElementById('app'));
