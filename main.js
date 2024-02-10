'use strict'

const BOARD_SIZE = 8;
const KNIGHT_MOVEMENTS = [
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
  
  for (const [deltaRow, deltaCol] of KNIGHT_MOVEMENTS) {
    const nextRow = row + deltaRow;
    const nextCol = col + deltaCol;
    
    if (isValidPosition(nextRow, nextCol)) {
      validMoves.push([nextRow, nextCol]);
    }
  }

  return validMoves;
}

function isValidPosition(row, col) {
  return row >= 0 && row < BOARD_SIZE && col >= 0 && col < BOARD_SIZE;
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
  path.unshift(start);
  return path;
}

console.log(knightMoves([0,0],[3,3]))
