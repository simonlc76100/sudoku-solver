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

function getGridboxes(rowsArray) {
  let boxesValues = [];
  for (let boxRow = 0; boxRow < 3; boxRow++) {
    for (let boxCol = 0; boxCol < 3; boxCol++) {
      for (let cellRow = 0; cellRow < 3; cellRow++) {
        for (let cellCol = 0; cellCol < 3; cellCol++) {
          let gridRow = boxRow * 3 + cellRow;
          let gridCol = boxCol * 3 + cellCol;

          boxesValues.push(rowsArray[gridRow][gridCol]);
        }
      }
    }
  }
  let boxesArray = new Array(9).fill().map(() => new Array(9));
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      boxesArray[i][j] = boxesValues[i * 9 + j];
    }
  }
  return boxesArray;
}

function fillCell(cell) {
  cell.firstChild.value = Math.floor(Math.random() * 9) + 1;
}

function solveGrid() {
  const cells = document.querySelectorAll('td[id^="cell_"]');
  const rowsArray = getGridRows(cells);
  const colsArray = getGridCols(rowsArray);
  const boxesArray = getGridboxes(rowsArray);

  console.log(rowsArray);
  console.log(colsArray);
  console.log(boxesArray);

  fillCell(rowsArray);
}

function main() {
  createGrid();

  const solveButton = document.getElementById("solveButton");
  solveButton.addEventListener("click", solveGrid);
}

document.addEventListener("DOMContentLoaded", main);
