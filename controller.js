"use strict";

import * as view from './view.js';
import * as model from './model.js';

function startController() {
    console.log("Controller started");
    const rows = 25;
    const cols = 25;
    model.initializeGrid();
    view.createGrid(model);
}

function kruskalMaze() {
    // kig på en random væg der ikke er en ydervæg
    const wall = model.getInnerWall()

    // hvis nord-syd eller øst-vest ikke allerede hænger sammen, så fjern væggen
    // og hægt de to sæt sammen
    
}

startController();