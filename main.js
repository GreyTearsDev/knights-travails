'use strict'

const chessboard = Array(8).fill().map(() => Array(8).fill(false));
const knightMoves = [
  [-2, -1],
  [-2, 1],
  [-1, -2],
  [-1, 2],
  [1, -2],
  [1, 2],
  [2, -1],
  [2, 1],
];

function getValidMoves(row, col) {
  const validMoves = [];
  
  /* deltaX represents the change in row and deltaY 
  represents the change in column*/
  for (const [deltaX, deltaY] of knightMoves) {
    const nextRow = row + deltaX;
    const nextCol = col + deltaY;
    if (nextRow >= 0 && nextRow < 8 && nextCol >= 0 && nextCol < 8) {
      validMoves.push([nextRow, nextCol]);
    }
  }

  return validMoves;
}

function bfs(start, target) {
  const visited = new Set();
  const queue = [[...start], start];

  while (queue.length > 0) {
    const [row, col, parent] = queue.shift();
    if (row == target[0] && col === target[1]) {
      return parent; // return the target position's parent for backtraking
    } 
    visited.add(`${row},${col}`);

    const validMoves = getValidMoves(row, col);
    for (const [nextRow, nextCol] of validMoves) {
      const key = `${nextRow},${nextCol}`;
      if (!visited.has(key)) {
        queue.push([nextRow, nextCol, [row, col]]);
      }
    }
  }
  return null; // target position not reachable;
}
