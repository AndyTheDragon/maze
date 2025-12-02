"use strict";

import * as view from './view.js';
import * as model from './model.js';

function startController() {
    console.log("Controller started");
    const rows = 7;
    const cols = 7;
    model.initializeGrid();
    view.createGrid(model);
    window.model = model; // For debugging purposes
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
        console.log(`North neighbour: ${neighbors.north}, South neighbour: ${neighbors.south}`);
        if (!model.inSameSet(neighbors.north, neighbors.south)) {
            model.joinSetsAndAddWall(neighbors.north, neighbors.south, wall);
        }
    }
    if (!model.isHorizontalWall(wall.row, wall.col)) {
        if (!model.inSameSet(neighbors.east, neighbors.west)) {
            model.joinSetsAndAddWall(neighbors.east, neighbors.west, wall);
        }
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