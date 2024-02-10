'use strict'

const chessboard = Array(8).fill().map(() => Array(8).fill(false));
const knightMovements = [
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
  for (const [deltaX, deltaY] of knightMovements) {
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
  const queue = [start];
  const parents = {};
  
  while (queue.length > 0) {
    const [row, col] = queue.shift();
    if (row === target[0] && col === target[1]) {
      return parents; // return the target position's parent for backtraking
    } 
    visited.add(`${row},${col}`);

    const validMoves = getValidMoves(row, col);
    for (const [nextRow, nextCol] of validMoves) {
      const key = `${nextRow},${nextCol}`;
      if (!visited.has(key)) {
        queue.push([nextRow, nextCol]);
        parents[`${nextRow},${nextCol}`] = [row, col];
      }
    }
  }
  return null; // target position not reachable;
}

function knightMoves(start, target) {
  const path = [];
  const parents = bfs(start, target);

  if (parents === null) {
    return null;
  }

  // backtracking from target to start to get the path
  let current = target.join();
  while (current in parents) {
    // convert string back to array
    path.unshift(current.split(',').map(Number));
    // move to the parent position;
    current = parents[current].join();
  }
  return path;
}

console.log(knightMoves([0,0],[3,3]))
