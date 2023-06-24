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

function getNextEmptyCell(gridMatrix) {
  for (let i = 0; i < gridMatrix.length; i++) {
    for (let j = 0; j < gridMatrix[i].length; j++) {
      if (gridMatrix[i][j] === 0) {
        return [i, j];
      }
    }
  }
}

function test() {
  const cells = document.querySelectorAll('td[id^="cell_"]');
  let gridMatrix = getGridMatrix(cells);
  console.log(getNextEmptyCell(gridMatrix));
}

function main() {
  createGrid();

  const solveButton = document.getElementById("solveButton");
  solveButton.addEventListener("click", test);
}

document.addEventListener("DOMContentLoaded", main);
