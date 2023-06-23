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

function getEmptyCells(rowsArray) {
  let emptyCellArray = [];

  for (let i = 0; i < rowsArray.length; i++) {
    for (let j = 0; j < rowsArray[i].length; j++) {
      if (rowsArray[i][j].firstChild.value === "") {
        const emptyCell = {
          rowIndex: i,
          colIndex: j,
        };
        emptyCellArray.push(emptyCell);
      }
    }
  }
  return emptyCellArray;
}

async function solveGrid(timer) {
  const cells = document.querySelectorAll('td[id^="cell_"]');
  const rowsArray = getGridRows(cells);
  const colsArray = getGridCols(rowsArray);
  const boxesArray = getGridboxes(rowsArray);
  const emptyCellArray = getEmptyCells(rowsArray);

  console.log(rowsArray);
  console.log(colsArray);
  console.log(boxesArray);
  console.log(emptyCellArray);

  for (let i = 0; i < rowsArray.length; i++) {
    for (let j = 0; j < rowsArray[i].length; j++) {
      let currentRow = rowsArray[i].map((cell) => {
        return cell.firstChild.value;
      });
      console.log("r", currentRow);
      let currentCol = colsArray[j].map((cell) => {
        return cell.firstChild.value;
      });
      console.log("c", currentCol);

      boxIndex = Math.floor(i / 3) * 3 + Math.floor(j / 3);

      let currentBox = boxesArray[boxIndex].map((cell) => {
        return cell.firstChild.value;
      });
      console.log("s", currentBox);

      if (rowsArray[i][j].firstChild.value === "") {
        let randomNum;
        do {
          randomNum = Math.floor(Math.random() * 9) + 1;
        } while (
          currentRow.includes(String(randomNum)) ||
          currentCol.includes(String(randomNum)) ||
          currentBox.includes(String(randomNum))
        );
        rowsArray[i][j].firstChild.value = randomNum;
        await timer(1);
      }
    }
  }
}

function main() {
  createGrid();

  const timer = (ms) => new Promise((res) => setTimeout(res, ms));

  const solveButton = document.getElementById("solveButton");
  solveButton.addEventListener("click", function () {
    solveGrid(timer);
  });
}

document.addEventListener("DOMContentLoaded", main);
