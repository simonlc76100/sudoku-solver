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
        matrix[i][j] = parseInt(cells[i * 9 + j].firstChild.value);
    }
  }
  return gridMatrix;
}

function main() {
  createGrid();

  const cells = document.querySelectorAll('td[id^="cell_"]');

  console.log(getGridMatrix(cells));

  const solveButton = document.getElementById("solveButton");
}

document.addEventListener("DOMContentLoaded", main);
