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
    return (
      <table border="1">
        <tbody>
        <Grid onclick={this.handleClick} grid={this.state.grid}/>
        </tbody>
      </table>
    );
  }
  handleClick(colIndex) {
    alert('colIndex = ' + colIndex);


  }
}

ReactDOM.render(<Game />, document.getElementById('app'));
