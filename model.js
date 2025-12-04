"use strict";
import Grid from './grid.js';
import shuffle from './shuffle.js';

const WALL = 1;
const OPEN = 0;
const grid = new Grid(31, 43);
let innerWalls = [];
const paths = new Set();

export function readCell(row, col) {
    return grid.get({ row, col }).value;
}

export function writeCell(row, col, value) {
    grid.set({ row, col }, value);
}

export function getGridSize() {
    return { rows: grid.rows, cols: grid.cols };
}

export function getNeighbours(row, col) {
    return grid.getNeighbours({ row, col });
}

export function initializeGrid() {
    for (let row = 0; row < grid.rows; row++) {
        for (let col = 0; col < grid.cols; col++) {
            if (row%2 === 0 || col%2 === 0) {
                grid.set({ row, col }, WALL); // Initial walls
                if (!isOuterWall(row, col)) {
                    innerWalls.push(grid.get({ row, col }));
                }
            } else {
                grid.set({ row, col }, OPEN); // Open space
                const path = new Set();
                path.add(grid.get({ row, col }));
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
    return grid.north({row, col}).value === WALL || grid.south({row, col}).value === WALL;
}

export function isHorizontalWall(row, col) {
    if (col < 1 || col >= grid.cols - 1) return true;
    return grid.east({row, col}).value === WALL || grid.west({row, col}).value === WALL;
}

export function removeWall(row, col) {

    writeCell(row, col, OPEN);
}

export function getNextInnerWall() {
    return innerWalls.pop();
}

export function isMazeComplete(){
    return paths.size === 1 || innerWalls.size === 0;
}
export function setStartAndExit() {
    const start = {row: 0, col: 1};
    const exit = {row: this.getGridSize().rows - 1, col: this.getGridSize().cols - 2};
    this.removeWall(start.row, start.col);
    this.removeWall(exit.row, exit.col);
}

export function joinSetsAndAddWall(cellA, cellB, wall) {
    const setA = findSetInSet(cellA, paths);
    const setB = findSetInSet(cellB, paths);
    
    if (setA && setB && setA !== setB) {
        let union = setA.union(setB);
        paths.delete(setA);
        paths.delete(setB);
        removeWall(wall.row, wall.col);
        union.add(grid.get({row: wall.row, col: wall.col}));
        paths.add(union);
    }
}

export function inSameSet(cellA, cellB) {
    const setA = findSetInSet(cellA, paths);
    const setB = findSetInSet(cellB, paths);

    const result = setA === setB;

    return {result, setA, setB};
}

/* 
// searches through a set of sets to find the set containing 
// the given cell
// Tidskomplexitet: O(n*log(m)) hvor n er antal sæt og m er størrelsen af det største sæt
// Set.has() er O(log m) i gennemsnit for et sæt med m elementer
*/
function findSetInSet(cellToFind, setOfSets) {

    for (let set of setOfSets) {
    
        if (set.has(cellToFind)) {
            //console.log("Found set for cell:", cellToFind, set);
            return set;
        }
    }
    return null;    
}

