import React from 'react';

function Row(props) {
  var colors = {'Y': 'yellow', 'R': 'red', null: 'white'};
  return (
    <tr>
      {props.row.map((cell, colIndex) => <td key={colIndex} onClick={() => {props.onclick(colIndex)}} bgcolor={colors[cell]}>O</td>)}
    </tr>
  );
}

export default Row;
