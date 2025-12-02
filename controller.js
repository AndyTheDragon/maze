"use strict";

import * as view from './view.js';
import * as model from './model.js';

function startController() {
    console.log("Controller started");
    const rows = 7;
    const cols = 7;
    model.initializeGrid();
    view.createGrid(model);
}

function kruskalMaze() {
    // kig på en random væg der ikke er en ydervæg
    const wall = model.getNextInnerWall();
    if (!wall) {
        console.log("Maze generation complete");
        return;
    }
    view.setActiveCell(wall.row, wall.col);

    // hvis nord-syd eller øst-vest ikke allerede hænger sammen, så fjern væggen
    // og hægt de to sæt sammen
    const neighbors = model.getNeighbors(wall.row, wall.col);
    console.log(neighbors);

    if (!model.isVerticalWall(wall.row, wall.col)) {
        model.removeWall(wall.row, wall.col)
    }
    if (!model.isHorizontalWall(wall.row, wall.col)) {
        model.removeWall(wall.row, wall.col)
    }
}

function updateGrid() {
    view.updateGrid(model)
}

document.getElementById('generate').addEventListener('click', () => {
    kruskalMaze();
});

document.getElementById('step').addEventListener('click', () => {
    updateGrid();
});

startController();