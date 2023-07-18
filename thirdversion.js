var box = document.getElementById("box");
var row = 20, col = 20;
var start = { x: 0, y: 0 }

// Step 1: Create grid and initialize maze
var maze = [];
createGrid();
// ------------

// Step 2: Generate Maze
GenerateMaze();
//----------


async function GenerateMaze() {
    // Step 3: Set starting point as visited
    staringCell = maze[maze.findIndex(e => e.x == start.x && e.y == start.y)]
    maze[maze.findIndex(e => e.x == staringCell.x && e.y == staringCell.y)].status = "visited";

    // Step 4: Initialize maze stack
    var maze_stack = [];

    var cell = maze[maze.findIndex(e => e.x === staringCell.x && e.y === staringCell.y)]
    maze_stack.push(cell);

    while (maze_stack.length > 0) {
        let nonvisitedNBCell = RandomNonVisitedNeighbour(cell);

        if (nonvisitedNBCell === -1) {
            maze_stack.pop();
            cell = maze_stack[maze_stack.length - 1];
            if (cell)
                nonvisitedNBCell = RandomNonVisitedNeighbour(cell)
        } else {
            // Pushing element to stack
            maze_stack.push(cell);

            // Removing walls of neighbor cells with delay
            removeWallsof({
                x: cell.x,
                y: cell.y
            }, {
                x: nonvisitedNBCell.x,
                y: nonvisitedNBCell.y
            }, nonvisitedNBCell.position);

            const selectednonvisitedcell = maze[maze.findIndex(e => e.x == nonvisitedNBCell.x && e.y == nonvisitedNBCell.y)];
            // Setting chosen neighbor cell as visited
            selectednonvisitedcell.status = "visited";

            // Update the current cell to chosen cell
            cell = selectednonvisitedcell;
        }

        // Delay between each step
        // await delay(0);
    }
}

function createGrid() {
    for (var i = 0; i < row; i++) {
        for (var j = 0; j < col; j++) {
            const para = document.createElement("div");
            para.className = "cell";
            para.id = `${i}-${j}`;
            box.appendChild(para);
            maze.push({
                x: i,
                y: j,
                status: "unvisited",
                walls: {
                    top: true,
                    bottom: true,
                    left: true,
                    right: true
                }
            });
        }
    }
    document.getElementById("0-0").style.background = "rgb(229, 177, 255)"
    document.getElementById("19-19").style.background = "rgb(229, 177, 255)"
}

function RandomNonVisitedNeighbour(cell) {
    // Finding unvisited neighbor cells
    // Top, bottom, left and right
    let topEle = maze[maze.findIndex(e => e.x == cell.x - 1 && e.y == cell.y)];
    let bottomEle = maze[maze.findIndex(e => e.x == cell.x + 1 && e.y == cell.y)];
    let leftEle = maze[maze.findIndex(e => e.x == cell.x && e.y == cell.y - 1)];
    let rightEle = maze[maze.findIndex(e => e.x == cell.x && e.y == cell.y + 1)];
    let list = [];
    if (topEle && topEle.status !== "visited")
        list.push({ ...topEle, position: "top" });
    if (bottomEle && bottomEle.status !== "visited")
        list.push({ ...bottomEle, position: "bottom" });
    if (leftEle && leftEle.status !== "visited")
        list.push({ ...leftEle, position: "left" });
    if (rightEle && rightEle.status !== "visited")
        list.push({ ...rightEle, position: "right" });
    if (list.length == 0)
        return -1;
    return list[Math.floor(Math.random() * list.length)];
}

function removeWallsof(cell, neighbour, position) {
    const cell1 = document.getElementById(`${cell.x}-${cell.y}`);
    const cell2 = document.getElementById(`${neighbour.x}-${neighbour.y}`);

    if (position == "top") {
        cell1.style.borderTop = "3px solid white";
        cell2.style.borderBottom = "3px solid white";
        maze[maze.findIndex(e => e.x == cell.x && e.y == cell.y)].walls.top = false;
        maze[maze.findIndex(e => e.x == neighbour.x && e.y == neighbour.y)].walls.bottom = false;
    } else if (position == "bottom") {
        cell1.style.borderBottom = "3px solid white";
        cell2.style.borderTop = "3px solid white";
        maze[maze.findIndex(e => e.x == cell.x && e.y == cell.y)].walls.bottom = false;
        maze[maze.findIndex(e => e.x == neighbour.x && e.y == neighbour.y)].walls.top = false;
    } else if (position == "left") {
        cell1.style.borderLeft = "3px solid white";
        cell2.style.borderRight = "3px solid white";
        maze[maze.findIndex(e => e.x == cell.x && e.y == cell.y)].walls.left = false;
        maze[maze.findIndex(e => e.x == neighbour.x && e.y == neighbour.y)].walls.right = false;
    } else if (position == "right") {
        cell1.style.borderRight = "3px solid white";
        cell2.style.borderLeft = "3px solid white";
        maze[maze.findIndex(e => e.x == cell.x && e.y == cell.y)].walls.right = false;
        maze[maze.findIndex(e => e.x == neighbour.x && e.y == neighbour.y)].walls.left = false;
    }
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

var solvingMaze = maze.map(obj => {
    const newObj = { ...obj };
    newObj.status = 'unvisited';
    return newObj;
});

async function solveMazePuzzle() {
    const startingcell = { x: 0, y: 0 }
    const endingcell = { x: 19, y: 19 }
    let solvingstack = [];


    let cell = solvingMaze[solvingMaze.findIndex(e => e.x == startingcell.x && e.y == startingcell.y)]
    solvingMaze[solvingMaze.findIndex(e => e.x == startingcell.x && e.y == startingcell.y)].status = "visited";
    solvingstack.push(cell);

    while (solvingstack.length > 0) {

        //check for maze exit 
        if (cell.x === endingcell.x && cell.y === endingcell.y)
            break;

        let nextCell = openingCells(cell);
        if (nextCell === -1) {
            document.getElementById(`${cell.x}-${cell.y}`).style.backgroundColor = " ";
            solvingstack.pop();
            cell = solvingstack[solvingstack.length - 1];
            if (cell) {
                document.getElementById(`${cell.x}-${cell.y}`).style.backgroundColor = " ";
                nextCell = openingCells(cell);
            }
        }
        else {
            solvingstack.push(cell);
            document.getElementById(`${cell.x}-${cell.y}`).style.backgroundColor = "#d4fdd4";

            const selectednonvisitedcell = solvingMaze[solvingMaze.findIndex(e => e.x == nextCell.x && e.y == nextCell.y)];
            // Setting chosen neighbor cell as visited
            selectednonvisitedcell.status = "visited";

            // Update the current cell to chosen cell
            cell = selectednonvisitedcell;
        }
        // await delay(0);
    }
}

function openingCells(currentcell) {
    var listOfOpening = [];
    const topCell = solvingMaze[solvingMaze.findIndex(e => e.x == currentcell.x - 1 && e.y == currentcell.y)];
    const bottomCell = solvingMaze[solvingMaze.findIndex(e => e.x == currentcell.x + 1 && e.y == currentcell.y)];
    const leftCell = solvingMaze[solvingMaze.findIndex(e => e.x == currentcell.x && e.y == currentcell.y - 1)];
    const rightCell = solvingMaze[solvingMaze.findIndex(e => e.x == currentcell.x && e.y == currentcell.y + 1)];

    if (topCell && currentcell.walls.top === false) {
        listOfOpening.push(topCell);
    }
    if (bottomCell && currentcell.walls.bottom === false) {
        listOfOpening.push(bottomCell);
    }
    if (leftCell && currentcell.walls.left === false) {
        listOfOpening.push(leftCell);
    }
    if (rightCell && currentcell.walls.right === false) {
        listOfOpening.push(rightCell);
    }
    if (listOfOpening.length == 0)
        return -1;
    return listOfOpening[Math.floor(Math.random() * listOfOpening.length)];
}








