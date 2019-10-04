import React from 'react';
import Grid from './grid';
import {checkForTie, checkForWin} from './checkers';

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
        <div>{(this.state.gameStatus === null) ? 'Next player: ' + ((this.state.currentPlayerIsRed) ? 'red' : 'yellow') : null}</div>
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
      // if null slot found, make new grid with slot filled
      if (rowIndex > -1) {
        var newGrid = this.state.grid.slice();
        newGrid[rowIndex][colIndex] = (this.state.currentPlayerIsRed) ? 'R' : 'Y';
        // if game is continuing set state to switch to next player, otherwise to update game status
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

export default Game;
