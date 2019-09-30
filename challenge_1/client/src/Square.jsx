import React from 'react';

function Square ({value, row, column, onclick}) {
  return (
      <button onClick={() => {onclick(row, column)}}>
        {value}
      </button>
  );
}

export default Square;