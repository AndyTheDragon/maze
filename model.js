"use strict";
import Grid from './grid.js';
import shuffle from './shuffle.js';

const grid = new Grid(25, 25);
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
    for (let r = 0; r < grid.rows; r++) {
        for (let c = 0; c < grid.cols; c++) {
            if (r%2 === 0 || c%2 === 0) {
                grid.set({ row: r, col: c }, 1); // Initial walls
                innerWalls.push({ row: r, col: c });
            } else {
                grid.set({ row: r, col: c }, 0); // Open space
                const path = new Set();
                path.add({ row: r, col: c });
                paths.add(path);
            }
        }
    }
    // Randomize the inner walls
    innerWalls = shuffle(innerWalls);

}