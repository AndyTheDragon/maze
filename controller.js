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
    const wall = chooseRandomWall();

    // hvis nord-syd eller øst-vest ikke allerede hænger sammen, så fjern væggen
    // og hægt de to sæt sammen
    const neighbours = model.getNeighbours(wall.row, wall.col);
    console.log(neighbours);

    lookAtNeighbours([neighbours.north, neighbours.south]);
    handleNorthSouthNeighbours(neighbours.north, neighbours.south, wall);

    lookAtNeighbours([neighbours.east, neighbours.west]);
    handleEastWestNeighbours(neighbours.east, neighbours.west, wall);
}

function chooseRandomWall(){
    const wall = model.getNextInnerWall();
    if (!wall) {
        model.setStartAndExit();
        console.log("Maze generation complete");
        return;
    }
    view.setActiveCell(wall.row, wall.col);
    
    return wall;
}

function lookAtNeighbours(neighbours){
    view.markCells([neighbours[0], neighbours[1]]);
}

function handleNorthSouthNeighbours(north, south, wall){
    if (!model.isVerticalWall(wall.row, wall.col)) {
        let {result, setA, setB} = model.inSameSet(north, south);
        view.markCells(setA);
        view.markCells(setB);
        if (!result) {
            model.joinSetsAndAddWall(north, south, wall);
        }
        return {setA, setB};
    } else {
        view.unmarkCells([north, south]);
        return null;
    }
}

function handleEastWestNeighbours(east, west, wall){
    if (!model.isHorizontalWall(wall.row, wall.col)) {
        let {result, setA, setB} = model.inSameSet(east, west);
        view.markCells(setA);
        view.markCells(setB);
        if (!result) {
            model.joinSetsAndAddWall(east, west, wall);
        }
        return {setA, setB};
    } else {
        view.unmarkCells([east, west]);
        return null;
    }
}

function updateGrid() {
    //view.unmarkCells()
    view.updateGrid(model)
}

document.getElementById('generate').addEventListener('click', () => {
    updateGrid();
    kruskalMaze();
});

document.getElementById('step').addEventListener('click', () => {
    updateGrid();
});

startController();