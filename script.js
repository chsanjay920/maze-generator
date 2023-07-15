var box = document.getElementById("box");
var row = 20, col = 20;
var start = { x: 0, y: 0 }



//step-1 
var maze = []
createGrid();
// ------------
GenerateMaze();
//----------


function GenerateMaze() {
    //step-2: starting point
    staringCell = maze[maze.findIndex(e => e.x == start.x && e.y == start.y)]
    maze[maze.findIndex(e => e.x == staringCell.x && e.y == staringCell.y)].status = "visited";

    //step-3
    var maze_stack = [];


    var cell = maze[maze.findIndex(e => e.x === staringCell.x && e.y === staringCell.y)]
    maze_stack.push(cell);

    while (maze_stack.length > 0) {

        let nonvisitedNBCell = RandomNonVisitedNeighbour(cell);


        if (nonvisitedNBCell === -1) {
            maze_stack.pop();
            console.log("poped");
            cell = maze_stack[maze_stack.length - 1];
            nonvisitedNBCell = RandomNonVisitedNeighbour(cell)
        }
        else {
            //pushing element to stack
            maze_stack.push(cell);
            //removing walls of neighbour cells
            removeWallsof(`${cell.x}-${cell.y}`, `${nonvisitedNBCell.x}-${nonvisitedNBCell.y}`, nonvisitedNBCell.position);


            const selectednonvisitedcell = maze[maze.findIndex(e => e.x == nonvisitedNBCell.x && e.y == nonvisitedNBCell.y)];
            //setting choosed neighbour cell as visited
            selectednonvisitedcell.status = "visited";

            //update the current cell to choosen cell
            cell = selectednonvisitedcell;
        }
    }
}

function createGrid() {
    for (var i = 0; i < row; i++) {
        for (var j = 0; j < col; j++) {
            const para = document.createElement("div");
            para.className = "cell";
            para.id = `${i}-${j}`;
            box.appendChild(para);
            maze.push(
                {
                    x: i,
                    y: j,
                    status: "unvisited"
                }
            )
        }
    }
    document.getElementById("0-0").innerHTML = "&#x2655;"
    document.getElementById("19-19").innerHTML = "&#x2654;"
}


function RandomNonVisitedNeighbour(cell) {
    //finding unvisited neighbour cells
    //top, botton, left and right
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
    }
    else if (position == "bottom") {
        cell1.style.borderBottom = "3px solid white";
        cell2.style.borderTop = "3px solid white";
    }
    else if (position == "left") {
        cell1.style.borderLeft = "3px solid white";
        cell2.style.borderRight = "3px solid white";
    }
    else if (position == "right") {
        cell1.style.borderRight = "3px solid white";
        cell2.style.borderLeft = "3px solid white";
    }
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
