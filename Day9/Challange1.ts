import {fs, csv} from "../Imports";

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

function newTailPosition(currentHeadX: number, currentHeadY: number, currentTailX: number, currentTailY: number): {x: number, y: number} {
    let newTailX = currentTailX;
    let newTailY = currentTailY;
    if (currentHeadX === currentTailX) {
        // Tail is in same col so needs to go up or down
        if (currentHeadY < (currentTailY - 1)) {
            newTailY--;
        } else if (currentHeadY > (currentTailY + 1)) {
            newTailY++;
        }
    } else if (currentHeadY === currentTailY) {
        // Tail is in same row so needs to go left or right
        if (currentHeadX < (currentTailX - 1)) {
            newTailX--;
        } else if (currentHeadX > (currentTailX + 1)) {
            newTailX++;
        }
    } else if (currentHeadX !== currentTailX && currentHeadY !== currentTailY) {
        if ((currentHeadX < (currentTailX - 1) && currentHeadY > currentTailY) 
            || (currentHeadY > (currentTailY + 1) && currentHeadX < currentTailX)) {
            // Tail needs to follow header diagonally up and left
            newTailX--;
            newTailY++;
        } else if ((currentHeadX > (currentTailX + 1) && currentHeadY > currentTailY) 
            || (currentHeadY > (currentTailY + 1) && currentHeadX > currentTailX)) {
            // Tail needs to follow header diagonally up and right
            newTailX++;
            newTailY++;
        } else if ((currentHeadY < (currentTailY - 1) && currentHeadX > currentTailX) 
            || (currentHeadX > (currentTailX + 1) && currentHeadY < currentTailY)) {
            // Tail needs to follow header diagonally down and right
            newTailX++;
            newTailY--;
        } else if ((currentHeadY < (currentTailY - 1) && currentHeadX < currentTailX)
            || (currentHeadX < (currentTailX - 1) && currentHeadY < currentTailY)) {
            // Tail needs to follow header diagonally down and left
            newTailX--;
            newTailY--;
        }
    }
    return {x: newTailX, y: newTailY};
}

function calculateNewLocation(coordVisitedList: {x: number, y:number}[], headLoc: {x: number, y:number}, tailLoc: {x: number, y:number}, dir: string, dis: string): {newHeadLoc: {x: number, y:number}, newTailLoc: {x: number, y:number}} {
    let currentHeadX = headLoc.x;
    let currentHeadY = headLoc.y;
    let currentTailX = tailLoc.x;
    let currentTailY = tailLoc.y;

    let distLeft = parseInt(dis);
    while(distLeft > 0) {
        // Move Head
        switch(dir) {
            case 'R':
                currentHeadX += 1
                break;
            case 'L':
                currentHeadX -= 1
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
        let newTailPos = newTailPosition(currentHeadX, currentHeadY, currentTailX, currentTailY);
        // Only add to list if it doesn't already exist
        if (coordVisitedList.findIndex((pos) => pos.x === newTailPos.x && pos.y == newTailPos.y) === -1) {
           coordVisitedList.push(newTailPos); 
        }
        currentTailX = newTailPos.x;
        currentTailY = newTailPos.y;
        distLeft--;
    }
    return {newTailLoc: {x: currentTailX, y: currentTailY}, newHeadLoc: {x: currentHeadX, y: currentHeadY}};
}

let parsedData: {Dir: string, Dis: string}[] = [];
fs.createReadStream("./Day9/data.csv")
    .pipe(csv({ headers: ["Dir", "Dis"], separator: " " })) // Parsed using the https://www.npmjs.com/package/csv-parser library
    .on("data", (data: {Dir: string, Dis: string}) => parsedData.push(data))
    .on("end", () => {
        let coordVisitedList: {x: number, y:number}[] = [{x: 0, y: 0}];
        let currentHeadLoc = {x: 0, y: 0};
        let currentTailLoc = {x: 0, y: 0};
        parsedData.forEach( (row)=> {
            let newLoc = calculateNewLocation(coordVisitedList, currentHeadLoc, currentTailLoc, row.Dir, row.Dis);
            currentHeadLoc = newLoc.newHeadLoc;
            currentTailLoc = newLoc.newTailLoc;
        });
        console.log(coordVisitedList.length);
    });
