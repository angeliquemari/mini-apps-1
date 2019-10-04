// check every element in top row
// if any element is null grid is not full, there is no tie
var checkForTie = function(grid) {
  var isTied = true;
  for (let i = 0; i < grid[0].length; i++) {
    if (grid[0][i] === null) isTied = false;
  }
  return isTied;
}

// return true if 4 cells filled by the same player
// in the column, row, or major/minor diagonal of a newly placed disc
var checkForWin = function(rowIndex, colIndex, grid) {
  return colWin(colIndex, grid) || rowWin(rowIndex, grid) || minDiagWin(rowIndex + colIndex, grid) || majDiagWin(colIndex - rowIndex, grid);
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
  // win not possible for diagonals with fewer than 4 cells
  if (diagReference < 3 || diagReference > 8) {
    return false;
  }
  var minDiagWin = false;
  var winCombos;
  // winCombos for each diagReference
  // if more time, would like to generate the winCombos instead of hardcoding them
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

var majDiagWin = function(diagReference, grid) {
  // win not possible for diagonals with fewer than 4 cells
  if (diagReference < -2 || diagReference > 3) {
    return false;
  }
  var majDiagWin;
  var winCombos;
  // winCombos for each diagReference
  // if more time, would like to generate the winCombos instead of hardcoding them
  if (diagReference === -2) {
    winCombos = [
      [[2,0], [3,1], [4,2], [5,3]]
    ];
  }
  if (diagReference === -1) {
    winCombos = [
      [[1,0], [2,1], [3,2], [4,3]],
      [[2,1], [3,2], [4,3], [5,4]]
    ];
  }
  if (diagReference === 0) {
    winCombos = [
      [[0,0], [1,1], [2,2], [3,3]],
      [[1,1], [2,2], [3,3], [4,4]],
      [[2,2], [3,3], [4,4], [5,5]]
    ];
  }
  if (diagReference === 1) {
    winCombos = [
      [[0,1], [1,2], [2,3], [3,4]],
      [[1,2], [2,3], [3,4], [4,5]],
      [[2,3], [3,4], [4,5], [5,6]]
    ];
  }
  if (diagReference === 2) {
    winCombos = [
      [[0,2], [1,3], [2,4], [3,5]],
      [[1,3], [2,4], [3,5], [4,6]]
    ];
  }
  if (diagReference === 3) {
    winCombos = [
      [[0,3], [1,4], [2,5], [3,6]]
    ];
  }
  for (let i = 0; i < winCombos.length; i++) {
    var indexes = winCombos[i];
    var redFourInAMajDiag = grid[indexes[0][0]][indexes[0][1]] === 'R' &&
      grid[indexes[1][0]][indexes[1][1]] === 'R' &&
      grid[indexes[2][0]][indexes[2][1]] === 'R' &&
      grid[indexes[3][0]][indexes[3][1]] === 'R';
    if (redFourInAMajDiag) majDiagWin = true;
    var yellowFourInAMajDiag = grid[indexes[0][0]][indexes[0][1]] === 'Y' &&
      grid[indexes[1][0]][indexes[1][1]] === 'Y' &&
      grid[indexes[2][0]][indexes[2][1]] === 'Y' &&
      grid[indexes[3][0]][indexes[3][1]] === 'Y';
    if (yellowFourInAMajDiag) majDiagWin = true;
  }
  return majDiagWin;
};

export {checkForTie, checkForWin}; 
