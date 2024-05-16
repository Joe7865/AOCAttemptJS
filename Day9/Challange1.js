"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Imports_1 = require("../Imports");
/**
 * Task:
 * 1) The the tail of the rope follows the head of the rope
 * 2) The tail must always end up adjacent to, diagonal from or on top of the head.
 * 3) The tail moves left, right, up or down if the head is in the same row or col
 * 4) The tail moves diagonally o/w
 *
 * Plan:
 * 1) 7 replaces this - Have a dictionary of coords since we don't know the shape of the grid
 * 2) 7 replaces this - Keys could be string i.e. "1_2": true if visited
 * 3) We only need to keep trakc of the current position of the head and tail I don't think this needs to be stored on the "board"
 * 4) We can handle each command separately using a different for loop depending on the direction
 * 5) We can use a function for updating the state (board) since objects/dictionaris are passed by reference.
 * 6) Let's start the head and tail being on 0_0
 * 7) The dictionary of coords could just be a list of coords because we only need to add a cord if its been visited ()
 *
 */
function newTailPosition(currentHeadX, currentHeadY, currentTailX, currentTailY) {
    var newTailX = currentTailX;
    var newTailY = currentTailY;
    if (currentHeadX === currentTailX) {
        // Tail is in same col so needs to go up or down
        if (currentHeadY < (currentTailY - 1)) {
            newTailY--;
        }
        else if (currentHeadY > (currentTailY + 1)) {
            newTailY++;
        }
    }
    else if (currentHeadY === currentTailY) {
        // Tail is in same row so needs to go left or right
        if (currentHeadX < (currentTailX - 1)) {
            newTailX--;
        }
        else if (currentHeadX > (currentTailX + 1)) {
            newTailX++;
        }
    }
    else if (currentHeadX !== currentTailX && currentHeadY !== currentTailY) {
        if ((currentHeadX < (currentTailX - 1) && currentHeadY > currentTailY)
            || (currentHeadY > (currentTailY + 1) && currentHeadX < currentTailX)) {
            // Tail needs to follow header diagonally up and left
            newTailX--;
            newTailY++;
        }
        else if ((currentHeadX > (currentTailX + 1) && currentHeadY > currentTailY)
            || (currentHeadY > (currentTailY + 1) && currentHeadX > currentTailX)) {
            // Tail needs to follow header diagonally up and right
            newTailX++;
            newTailY++;
        }
        else if ((currentHeadY < (currentTailY - 1) && currentHeadX > currentTailX)
            || (currentHeadX > (currentTailX + 1) && currentHeadY < currentTailY)) {
            // Tail needs to follow header diagonally down and right
            newTailX++;
            newTailY--;
        }
        else if ((currentHeadY < (currentTailY - 1) && currentHeadX < currentTailX)
            || (currentHeadX < (currentTailX - 1) && currentHeadY < currentTailY)) {
            // Tail needs to follow header diagonally down and left
            newTailX--;
            newTailY--;
        }
    }
    return { x: newTailX, y: newTailY };
}
function calculateNewLocation(coordVisitedList, headLoc, tailLoc, dir, dis) {
    var currentHeadX = headLoc.x;
    var currentHeadY = headLoc.y;
    var currentTailX = tailLoc.x;
    var currentTailY = tailLoc.y;
    var distLeft = parseInt(dis);
    var _loop_1 = function () {
        // Move Head
        switch (dir) {
            case 'R':
                currentHeadX += 1;
                break;
            case 'L':
                currentHeadX -= 1;
                break;
            case 'U':
                currentHeadY += 1;
                break;
            case 'D':
                currentHeadY -= 1;
                break;
            default:
                throw "Direction invalid!";
        }
        // move Tail
        var newTailPos = newTailPosition(currentHeadX, currentHeadY, currentTailX, currentTailY);
        // Only add to list if it doesn't already exist
        if (coordVisitedList.findIndex(function (pos) { return pos.x === newTailPos.x && pos.y == newTailPos.y; }) === -1) {
            coordVisitedList.push(newTailPos);
        }
        currentTailX = newTailPos.x;
        currentTailY = newTailPos.y;
        distLeft--;
    };
    while (distLeft > 0) {
        _loop_1();
    }
    return { newTailLoc: { x: currentTailX, y: currentTailY }, newHeadLoc: { x: currentHeadX, y: currentHeadY } };
}
var parsedData = [];
Imports_1.fs.createReadStream("./Day9/data.csv")
    .pipe((0, Imports_1.csv)({ headers: ["Dir", "Dis"], separator: " " })) // Parsed using the https://www.npmjs.com/package/csv-parser library
    .on("data", function (data) { return parsedData.push(data); })
    .on("end", function () {
    var coordVisitedList = [{ x: 0, y: 0 }];
    var currentHeadLoc = { x: 0, y: 0 };
    var currentTailLoc = { x: 0, y: 0 };
    parsedData.forEach(function (row) {
        var newLoc = calculateNewLocation(coordVisitedList, currentHeadLoc, currentTailLoc, row.Dir, row.Dis);
        currentHeadLoc = newLoc.newHeadLoc;
        currentTailLoc = newLoc.newTailLoc;
    });
    console.log(coordVisitedList.length);
});
