"use strict";

const WALL = 1;
const OPEN = 0;

export function createGrid(gridModel) {
    const grid = document.querySelector('#grid');
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

export function setActiveCell(row, col) {
    const previousActive = document.querySelector('.active');
    if (previousActive) {
        previousActive.classList.remove('active');
    }
    const cell = document.querySelector(`#cell-${row}-${col}`);
    if (cell) {
        cell.classList.add('active');
    }
}

export function markCells(cells){
    if (!cells) {
        console.error("unmarkCells called with null or undefined cells");
        return;
    };
    for (let cell of cells){
        const div = document.querySelector(`#cell-${cell.row}-${cell.col}`)
        if (div) {
            div.classList.add('current');
        }
    }
}

export function unmarkCells(cells){
    if (!cells) {
        console.error("unmarkCells called with null or undefined cells");
        return;
    };
    for (let cell of cells){
        const div = document.querySelector(`#cell-${cell.row}-${cell.col}`)
        if (div) {
            div.classList.remove('current');
        }
    }
}