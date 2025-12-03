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
let wall, neighbours, northSouthSets, eastWestSets, actionIndex = -1, timer;
const actions = [
    {
        step: () => {wall = chooseRandomWall(); neighbours = model.getNeighbours(wall.row, wall.col);},
        description: "Look at a random wall"
    },
    {
        step: () => lookAtNeighbours([neighbours.north, neighbours.south]),
        description: "Look at North and South neighbours"
    },
    {
        step: () => northSouthSets = handleNorthSouthNeighbours(neighbours.north, neighbours.south, wall),
        description: "If neighbours are paths and in different sets - remove wall and join sets"
    },
    {
        step: () => {if (northSouthSets !== null){
                        unmarkSets([northSouthSets.setA, northSouthSets.setB]);}
                    },
        description: "unmark sets if not null"
    },
    {
        step: () => lookAtNeighbours([neighbours.east, neighbours.west]),
        description: "Look at East and West neighbours"
    },
    {
        step: () => eastWestSets = handleEastWestNeighbours(neighbours.east, neighbours.west, wall),
        description: "If neighbours are paths and in different sets - remove wall and join sets"        
    },
    {
        step: () => {if (eastWestSets !== null){
                        unmarkSets([eastWestSets.setA, eastWestSets.setB]);}
                    },
        description: "unmark sets if not null"
    }
];


function kruskalMaze() {
    // kig på en random væg der ikke er en ydervæg
    const wall = chooseRandomWall();

    // hvis nord-syd eller øst-vest ikke allerede hænger sammen, så fjern væggen
    // og hægt de to sæt sammen
    const neighbours = model.getNeighbours(wall.row, wall.col);


    lookAtNeighbours([neighbours.north, neighbours.south]);
    const northSouthSets = handleNorthSouthNeighbours(neighbours.north, neighbours.south, wall);
    if (northSouthSets !== null){
        unmarkSets([northSouthSets.setA, northSouthSets.setB]);
    }

    lookAtNeighbours([neighbours.east, neighbours.west]);
    const eastWestSets = handleEastWestNeighbours(neighbours.east, neighbours.west, wall);
    if (eastWestSets !== null){
        unmarkSets([eastWestSets.setA, eastWestSets.setB]);
    }

    if (model.isMazeComplete()) {
        model.setStartAndExit();
        console.log("Maze generation complete");
        return;
    }
    
}

function unmarkSets(sets){
    for (let set of sets){
        view.unmarkCells(set);
    }
}

function chooseRandomWall(){
    const wall = model.getNextInnerWall();
    view.setActiveCell(wall.row, wall.col);
    console.log(wall);
    
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
    view.updateGrid(model);
    actionIndex++;
    actionIndex = actionIndex%(actions.length);
    actions[actionIndex].step();
    console.log(actions[actionIndex].description);
    
}

function tick(){
    view.updateGrid(model);
    if (!model.isMazeComplete()) {
        kruskalMaze()
        timer = setTimeout(tick, 50);
    } else {
        timer = null;
    }
}

document.getElementById('generate').addEventListener('click', () => {
    if (!timer){
        tick();
    } else {
        clearTimeout(timer);
        timer = null;
    }
});

document.getElementById('step').addEventListener('click', () => {
    updateGrid();
});

startController();