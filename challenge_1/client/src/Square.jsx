import React from 'react';

function Square ({value, row, column, onclick}) {
  if (value === null) {
    return (
        <button onClick={() => {onclick(row, column)}}>
          {value}
        </button>
    );
  } else { // square has already been filled, can't be clicked again
    return (
      <button>
        {value}
      </button>
    );
  }
}

export default Square;