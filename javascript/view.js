"use strict";

import { WALL, OPEN } from './constants.js';


/* 
// Adds the grid to the DOM 
// O(n) where n is the number of cells in the grid
*/
export function createGrid(gridModel) {
    const grid = document.querySelector('#grid');
    grid.innerHTML = ''; // Clear previous grid if any
    grid.style.gridTemplateRows = `repeat(${gridModel.getGridSize().rows}, 1fr)`;
    grid.style.gridTemplateColumns = `repeat(${gridModel.getGridSize().cols}, minmax(24px, 1fr))`;

    for (let r = 0; r < gridModel.getGridSize().rows; r++) {
        for (let c = 0; c < gridModel.getGridSize().cols; c++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.id = `cell-${r}-${c}`;
            if (gridModel.readCellValue(r, c) === WALL) {
                cell.classList.add('wall');
            } else {
                cell.classList.add('open');
            }
            grid.appendChild(cell);
        }
    }
}

/* 
// Removes all walls from the grid, and draws them again
// O(n) where n is the number of cells in the grid
*/
export function updateGrid(gridModel) {
    for (let row = 0; row < gridModel.getGridSize().rows; row++) {
        for (let col = 0; col < gridModel.getGridSize().cols; col++) {
            const cell = document.querySelector(`#cell-${row}-${col}`);
            cell.classList.remove('wall', 'open');
            if (gridModel.readCellValue(row, col) === WALL) {
                cell.classList.add('wall');
            } else {
                cell.classList.add('open');
            }
        }
    }
}

/* 
// Paints the active cell in the grid by removing the 'active' class and adding it to the new cell
// O(n) - because the querySelector is O(n) in the number of cells in the grid
// From mdn: The matching is done using depth-first pre-order traversal of the document's nodes starting 
// with the first element in the document's markup and iterating through sequential nodes by order of the number of child nodes.
*/
export function setActiveCell(row, col) {
    // if there is a blue active cell, remove the blue highlight
    const previousActive = document.querySelector('.active');
    if (previousActive) {
        previousActive.classList.remove('active');
    }
    // add blue highlight to the new active cell
    const cell = document.querySelector(`#cell-${row}-${col}`);
    if (cell) {
        cell.classList.add('active');
    }
}

/* 
// Paints cells in the grid by adding the 'current' class
// O(n*m) where n is the number of cells to mark, and m is the number of cells in the grid
*/
export function markCells(cells, color='yellow'){
    if (!cells) {
        console.error("markCells called with null or undefined cells");
        return;
    };
    for (let cell of cells){
        const div = document.querySelector(`#cell-${cell.row}-${cell.col}`)
        if (div) {
            div.classList.add(`mark${color}`);
        }
    }
}


/* 
// Removes the 'current' class
// O(n*m) where n is the number of cells to mark, and m is the number of cells in the grid
*/
export function unmarkCells(cells){
    if (!cells) {
        console.error("unmarkCells called with null or undefined cells");
        return;
    };
    for (let cell of cells){
        const div = document.querySelector(`#cell-${cell.row}-${cell.col}`)
        if (div) {
            div.classList.remove('markyellow', 'markorange', 'markgreen', 'active');
        }
    }
}

export function addToLog(message){
    const logDiv = document.getElementById('algo-log');
    const p = document.createElement('p');
    p.textContent = message;
    logDiv.appendChild(p);
    logDiv.scrollTop = logDiv.scrollHeight;
 
}

export function clearLog(){
    const logDiv = document.getElementById('algo-log');
    logDiv.innerHTML = '';
}