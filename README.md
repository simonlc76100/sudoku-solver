# Sudoku Solver

This small project is a web-based application built in HTML/CSS/JavaScript that solves Sudoku Grids using backtracking.

## Features

- **Sudoku Grid**: Input your own puzzles directly into the Sudoku grid.
- **Solve Button**: Click to have the grid solved instantly.

## How It Works

The application uses a backtracking algorithm to solve the puzzle. If a solution can be found, the algorithm will fill in the cells of the Sudoku grid one by one, making sure the value being placed respects the rules of Sudoku, until the puzzle is solved.

## Sudoku Rules

The rules of Sudoku are the following:

1. Each row must contain each digit (1 through 9) exactly once.
2. Each column must contain each digit (1 through 9) exactly once.
3. Each 3x3 box (the grid is divided into 9 such boxes) must contain each digit (1 through 9) exactly once.
