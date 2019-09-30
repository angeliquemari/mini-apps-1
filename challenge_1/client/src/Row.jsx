import React from 'react';
import Square from './Square';

function Row ({values, row, onclick}) {
  return (
    <div>
      <span><Square value={values[0]} row={row} column={0} onclick={onclick}/></span>
      <span><Square value={values[1]} row={row} column={1} onclick={onclick}/></span>
      <span><Square value={values[2]} row={row} column={2} onclick={onclick}/></span>
    </div>
  );
}

export default Row;