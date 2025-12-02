"use strict";
import Grid from './grid.js';
import shuffle from './shuffle.js';

const WALL = 1;
const OPEN = 0;
const grid = new Grid(7,7);
let innerWalls = [];
const paths = new Set();

export function readCell(row, col) {
    return grid.get({ row, col });
}

export function writeCell(row, col, value) {
    grid.set({ row, col }, value);
}

export function getGridSize() {
    return { rows: grid.rows, cols: grid.cols };
}

export function getNeighbors(row, col) {
    return {
        north: grid.north({ row, col }),
        east: grid.east({ row, col }),
        south: grid.south({ row, col }),
        west: grid.west({ row, col }),
    };
}

export function initializeGrid() {
    for (let row = 0; row < grid.rows; row++) {
        for (let col = 0; col < grid.cols; col++) {
            if (row%2 === 0 || col%2 === 0) {
                grid.set({ row, col }, WALL); // Initial walls
                if (!isOuterWall(row, col)) {
                    innerWalls.push({ row, col });
                }
            } else {
                grid.set({ row, col }, OPEN); // Open space
                const path = new Set();
                path.add({ row, col });
                paths.add(path);
            }
        }
    }
    // Randomize the inner walls
    innerWalls = shuffle(innerWalls);
    // TODO: Brug vores egen queue her i stedet for et vanilla array
}

function isOuterWall(row, col) {
    return row === 0 || col === 0 || row === grid.rows - 1 || col === grid.cols - 1;
}

export function isVerticalWall(row, col) {
    if (row < 1 || row >= grid.rows - 1) return true;
    return grid.north({row, col}).value === WALL && grid.south({row, col}).value === WALL;
}

export function isHorizontalWall(row, col) {
    if (col < 1 || col >= grid.cols - 1) return true;
    return grid.east({row, col}).value === WALL && grid.west({row, col}).value === WALL;
}

export function removeWall(row, col) {
    console.log(`Removing wall at ${row}, ${col}`)
    writeCell(row, col, OPEN);
}

export function getNextInnerWall() {
    return innerWalls.pop();
}