function createGrid() {
  const grid = document.getElementById("sudokuGrid");
  for (let i = 0; i < 9; i++) {
    const row = grid.insertRow(i);
    row.id = "row_" + i;
    for (let j = 0; j < 9; j++) {
      const cell = row.insertCell(j);
      cell.id = "cell_" + i + "_" + j;
      const input = document.createElement("input");
      input.addEventListener("input", isInputValid);
      cell.appendChild(input);
    }
  }
}

function isInputValid(event) {
  const input = event.target;
  let value = input.value;

  if (!/^[1-9]$/.test(value)) {
    value = value.slice(-1);
    input.value = /^[1-9]$/.test(value) ? value : "";
  }
}

function getGridMatrix(cells) {
  let gridMatrix = new Array(9).fill().map(() => new Array(9));

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      gridMatrix[i][j] = cells[i * 9 + j];
    }
  }
  return gridMatrix;
}

function getNextEmptyCellPos(gridMatrix) {
  for (let i = 0; i < gridMatrix.length; i++) {
    for (let j = 0; j < gridMatrix[i].length; j++) {
      if (gridMatrix[i][j].firstChild.value === "") {
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
  let rowValues = row.map((cell) => {
    if (cell.firstChild.value === "") return 0;
    return parseInt(cell.firstChild.value);
  });
  let col = [];

  for (let i = 0; i < gridMatrix.length; i++) {
    col.push(gridMatrix[i][nextEmptyCellCol]);
  }
  let colValues = col.map((cell) => {
    if (cell.firstChild.value === "") return 0;
    return parseInt(cell.firstChild.value);
  });
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

  let boxValues = box.map((cell) => {
    if (cell.firstChild.value === "") return 0;
    return parseInt(cell.firstChild.value);
  });

  if (
    !rowValues.includes(number) &&
    !colValues.includes(number) &&
    !boxValues.includes(number)
  )
    return true;
  return false;
}

async function backtrackSolving(gridMatrix, timer) {
  let nextEmptyCellPos = getNextEmptyCellPos(gridMatrix);

  if (nextEmptyCellPos === false) return true;

  for (let number = 1; number <= 9; number++) {
    if (canPlaceNumber(gridMatrix, nextEmptyCellPos, number) === true) {
      gridMatrix[nextEmptyCellPos[0]][nextEmptyCellPos[1]].firstChild.value =
        number;
      if (await backtrackSolving(gridMatrix, timer)) return true;
      else
        gridMatrix[nextEmptyCellPos[0]][nextEmptyCellPos[1]].firstChild.value =
          "";
    }
    await timer(1);
  }
  return false;
}

async function solveGrid() {
  const cells = document.querySelectorAll('td[id^="cell_"]');
  const gridMatrix = getGridMatrix(cells);

  const timer = (ms) => new Promise((res) => setTimeout(res, ms));

  await backtrackSolving(gridMatrix, timer);
}

function main() {
  createGrid();

  const solveButton = document.getElementById("solveButton");
  solveButton.addEventListener("click", solveGrid);
}

document.addEventListener("DOMContentLoaded", main);
