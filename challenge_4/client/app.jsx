import React from 'react';
import ReactDOM from 'react-dom';
const axios = require('axios');

function Row(props) {
  return (
    <tr>
      {props.row.map((cell, colIndex) => <td key={colIndex} onClick={() => {props.onclick(colIndex)}}>{cell}</td>)}
    </tr>
  );
}

function Grid(props) {
  return props.grid.map((row, rowIndex) => <Row key={rowIndex} row={row} onclick={props.onclick} /> );
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPlayerIsRed: true,
      grid: [
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null]
      ]
      // grid: [
      //   ['O', 'X', 'O'],
      //   ['X', 'O', 'O'],
      //   ['O', 'O', 'X']
      // ]
    }
    this.handleClick = this.handleClick.bind(this);
  }
  render() {
    return (
      <table border="1">
        <tbody>
        <Grid onclick={this.handleClick} grid={this.state.grid}/>
        </tbody>
      </table>
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
      this.setState({
        currentPlayerIsRed: !this.state.currentPlayerIsRed,
        grid: newGrid
      });
    }
  }
}

ReactDOM.render(<Game />, document.getElementById('app'));
