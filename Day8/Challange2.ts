import {fs, csv} from "../Imports";

/**
 * Plan for stage 2:
 * Scenic score is the number of trees visible from any one tree (the view is blocked by any tree greater than or equal to the origianl tree, larger trees behind such a tree are blocked from view)
 * What is the scenic score of the tree with the greatest scendc score
 * 
 * Options:
 * 1) can we use the same approach again, I don't think so. We need to start our investigaton from the individual tree each time
 * 2) Increment through each tree individually and check each direction
 */

function calculateScenicValue(treeArrays: number[][], treeRow: number, treeCol: number) : number {
    let currentTreeHeight = treeArrays[treeRow][treeCol];
    // right
    let scenicValR = 0;
    for (let i = treeRow + 1; i < treeArrays.length; i++) {
        if (treeArrays[i][treeCol] < currentTreeHeight) scenicValR++;
        else {
            scenicValR++;
            break;
        }
    }

    // left
    let scenicValL = 0;
    for (let i = treeRow - 1; i >= 0; i--) {
        if (treeArrays[i][treeCol] < currentTreeHeight) scenicValL++;
        else {
            scenicValL++;
            break;
        }
    }

    // up
    let scenicValU = 0;
    for (let j = treeCol - 1; j >= 0; j--) {
        if (treeArrays[treeRow][j] < currentTreeHeight) scenicValU++;
        else {
            scenicValU++;
            break;
        }
    }

    //down
    let scenicValD = 0;
    for (let j = treeCol + 1; j < treeArrays[0].length; j++) {
        if (treeArrays[treeRow][j] < currentTreeHeight) scenicValD++;
        else {
            scenicValD++;
            break;
        }
    }

    return scenicValR*scenicValL*scenicValU*scenicValD;
}

let parsedData: string[] = [];
fs.createReadStream("./Day8/data.csv")
    .pipe(csv({ headers: false, separator: "" })) // Parsed using the https://www.npmjs.com/package/csv-parser library
    .on("data", (data: string) => parsedData.push(data))
    .on("end", () => {
        let maxScenicValue = 0;
        let treeArrays: number[][] = [];

        // Populate tree arrays
        parsedData.forEach((row) => {
            let arrayOfNums = [];
            arrayOfNums = row["0"].split("").map((val) => {
                return parseInt(val);
            });
            treeArrays.push(arrayOfNums);
        });

        // Handle everything
        for (let i = 0; i < treeArrays.length; i++) {
            for (let j = 0; j < treeArrays[0].length; j++) {
                //if (i === 1 && j == 3) console.log("highestTree=" + highestTree + " currentTreeHeight=" + currentTree.height + " currentTreeSeen=" + currentTree.seen);
                let currentScenicVal = calculateScenicValue(treeArrays, i, j);
                if (currentScenicVal > maxScenicValue) maxScenicValue = currentScenicVal;
            }
        }
        console.log(maxScenicValue);
    });
