"use strict";

/**
 * Represents the size of the chessboard.
 * @constant {number}
 */
const BOARD_SIZE = 8;

/**
 * Represents the possible movements of a knight.
 * @constant {number[][]}
 */
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

/**
 * Calculates the valid moves for a knight from a given position.
 * @param {number} row - The row coordinate of the position.
 * @param {number} col - The column coordinate of the position.
 * @returns {number[][]} An array of valid moves represented as [row, col].
 */
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

/**
 * Checks if a position is valid within the chessboard.
 * @param {number} row - The row coordinate of the position.
 * @param {number} col - The column coordinate of the position.
 * @returns {boolean} True if the position is valid, false otherwise.
 */
function isValidPosition(row, col) {
  return row >= 0 && row < BOARD_SIZE && col >= 0 && col < BOARD_SIZE;
}

/**
 * Performs a Breadth-First Search (BFS) traversal to find the shortest path from start to target.
 * @param {number[]} start - The starting position represented as [row, col].
 * @param {number[]} target - The target position represented as [row, col].
 * @returns {Object|null} An object containing parent positions or null if target is not reachable.
 */
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

/**
 * Finds the shortest path from start to target using BFS and backtracking.
 * @param {number[]} start - The starting position represented as [row, col].
 * @param {number[]} target - The target position represented as [row, col].
 * @returns {number[][]|null} The shortest path as an array of positions, or null if target is not reachable.
 */
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
    path.unshift(current.split(",").map(Number));
    // move to the parent position;
    current = parents[current].join();
  }
  path.unshift(start);
  return path;
}

console.log(knightMoves([0, 0], [3, 3]));
