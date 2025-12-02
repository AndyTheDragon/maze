"use strict";

export function createGrid(gridModel) {
    const grid = document.querySelector('#grid');
    grid.style.gridTemplateRows = `repeat(${gridModel.getGridSize().rows}, 1fr)`;
    grid.style.gridTemplateColumns = `repeat(${gridModel.getGridSize().cols}, minmax(32px, 1fr))`;

    for (let r = 0; r < gridModel.getGridSize().rows; r++) {
        for (let c = 0; c < gridModel.getGridSize().cols; c++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.id = `cell-${r}-${c}`;
            if (gridModel.readCell(r, c) === 1) {
                cell.classList.add('wall');
            } else {
                cell.classList.add('open');
            }
            grid.appendChild(cell);
        }
    }

    // Place walls on the edges

}