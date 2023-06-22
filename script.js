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

function getGridRows(cells) {
  let rowsArray = new Array(9).fill().map(() => new Array(9));
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      rowsArray[i][j] = cells[i * 9 + j];
    }
  }
  return rowsArray;
}

function getGridCols(rowsArray) {
  let colsArray = new Array(9).fill().map(() => new Array(9));
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      colsArray[i][j] = rowsArray[j][i];
    }
  }
  return colsArray;
}

function main() {
  createGrid();

  const cells = document.querySelectorAll('td[id^="cell_"]');
  const rowsArray = getGridRows(cells);
}

document.addEventListener("DOMContentLoaded", main);
