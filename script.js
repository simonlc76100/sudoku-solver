function createGrid() {
  const grid = document.getElementById("sudokuGrid");
  for (let i = 0; i < 9; i++) {
    const row = grid.insertRow(i);
    row.id = "row_" + i;
    for (let j = 0; j < 9; j++) {
      const cell = row.insertCell(j);
      cell.id = "cell_" + i + "_" + j;
      const input = document.createElement("input");
      cell.appendChild(input);
    }
  }
}

function getGridMatrix(cells) {
  let gridMatrix = new Array(9).fill().map(() => new Array(9).fill(0));

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (cells[i * 9 + j].firstChild.value !== "")
        gridMatrix[i][j] = parseInt(cells[i * 9 + j].firstChild.value);
    }
  }
  return gridMatrix;
}

function getNextEmptyCellPos(gridMatrix) {
  for (let i = 0; i < gridMatrix.length; i++) {
    for (let j = 0; j < gridMatrix[i].length; j++) {
      if (gridMatrix[i][j] === 0) {
        return [i, j];
      }
    }
  }
  return false;
}

function canPlaceNumber(gridMatrix, nextEmptyCellPos, number) {
  let nextEmptyCellRow = nextEmptyCellPos[0];
  let nextEmptyCellCol = nextEmptyCellPos[1];

  let row = gridMatrix[nextEmptyCellRow];

  let col = [];

  for (let i = 0; i < gridMatrix.length; i++) {
    col.push(gridMatrix[i][nextEmptyCellCol]);
  }

  let boxPos = [
    Math.floor(nextEmptyCellRow / 3),
    Math.floor(nextEmptyCellCol / 3),
  ];

  let box = [];

  for (let i = 3 * boxPos[0]; i < 3 * boxPos[0] + 3; i++) {
    for (let j = 3 * boxPos[1]; j < 3 * boxPos[1] + 3; j++) {
      box.push(gridMatrix[i][j]);
    }
  }

  if (!row.includes(number) && !col.includes(number) && !box.includes(number))
    return true;
  return false;
}

function backtrackSolving(gridMatrix) {
  let nextEmptyCellPos = getNextEmptyCellPos(gridMatrix);

  if (nextEmptyCellPos === false) return true;

  for (let number = 1; number <= 9; number++) {
    if (canPlaceNumber(gridMatrix, nextEmptyCellPos, number) === true) {
      gridMatrix[nextEmptyCellPos[0]][nextEmptyCellPos[1]] = number;
      if (backtrackSolving(gridMatrix)) return true;
      else gridMatrix[nextEmptyCellPos[0]][nextEmptyCellPos[1]] = 0;
    }
  }
  return false;
}

function updateGridWhenSolved(gridMatrix) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const cell = document.getElementById("cell_" + i + "_" + j);
      cell.firstChild.value = gridMatrix[i][j];
    }
  }
}

function solveGrid() {
  const cells = document.querySelectorAll('td[id^="cell_"]');
  const gridMatrix = getGridMatrix(cells);

  if (backtrackSolving(gridMatrix)) updateGridWhenSolved(gridMatrix);
}

function main() {
  createGrid();

  const solveButton = document.getElementById("solveButton");
  solveButton.addEventListener("click", solveGrid);
}

document.addEventListener("DOMContentLoaded", main);
