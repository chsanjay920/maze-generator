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
            nonvisitedNBCell = RandomNonVisitedNeighbour(cell)
        } else {
            // Pushing element to stack
            maze_stack.push(cell);

            // Removing walls of neighbor cells with delay
            removeWallsof(`${cell.x}-${cell.y}`, `${nonvisitedNBCell.x}-${nonvisitedNBCell.y}`, nonvisitedNBCell.position);

            const selectednonvisitedcell = maze[maze.findIndex(e => e.x == nonvisitedNBCell.x && e.y == nonvisitedNBCell.y)];
            // Setting chosen neighbor cell as visited
            selectednonvisitedcell.status = "visited";

            // Update the current cell to chosen cell
            cell = selectednonvisitedcell;
        }

        // Delay between each step
        await delay(1); // Delay of 100 milliseconds
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
                status: "unvisited"
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
    const cell1 = document.getElementById(cell);
    const cell2 = document.getElementById(neighbour);
    if (position == "top") {
        cell1.style.borderTop = "3px solid white";
        cell2.style.borderBottom = "3px solid white";
    } else if (position == "bottom") {
        cell1.style.borderBottom = "3px solid white";
        cell2.style.borderTop = "3px solid white";
    } else if (position == "left") {
        cell1.style.borderLeft = "3px solid white";
        cell2.style.borderRight = "3px solid white";
    } else if (position == "right") {
        cell1.style.borderRight = "3px solid white";
        cell2.style.borderLeft = "3px solid white";
    }
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}














// while (nonvisitedNBCell == -1) {
//     if (maze_stack.length == 0) break;
//     cell = maze[maze.findIndex(e => e.x == maze_stack[0].x && e.y == maze_stack[0].y)];
//     cell.status = "visited";
//     maze_stack.pop();
//     nonvisitedNBCell = RandomNonVisitedNeighbour(cell);
// }

// remainingEle = maze.filter(e => e.status == "unvisited");
// while (nonvisitedNBCell == -1 && remainingEle.length > 0) {
//     if (remainingEle.length == 0) break;
//     cell = remainingEle[0];
//     cell.status = "visited";
//     remainingEle.pop();
//     nonvisitedNBCell = RandomNonVisitedNeighbour(cell);
//     remainingEle = maze.filter(e => e.status == "unvisited");
// }







// function select_Random_Neighbour(cell) {
//     let neighbour = Math.floor(Math.random() * 4);
//     //(0,1,2,3)=>(top,bottom,left,right)
//     switch (neighbour) {
//         case 0: {
//             if (cell.x - 1 >= 0)
//                 return maze[maze.findIndex(e => e.x == cell.x - 1 && e.y == cell.y)]
//             break;
//         }
//         case 1: {

//             if (cell.x + 1 < row)
//                 return maze[maze.findIndex(e => e.x == cell.x + 1 && e.y == cell.y)]
//             break;
//         }
//         case 2: {
//             if (cell.y - 1 >= 0)
//                 return maze[maze.findIndex(e => e.x == cell.x && e.y == cell.y - 1)]
//             break;
//         }
//         case 3: {
//             if (cell.y + 1 < col)
//                 return maze[maze.findIndex(e => e.x == cell.x && e.y == cell.y + 1)]
//             break;
//         }
//     }
//     return select_Random_Neighbour(cell);
// }
