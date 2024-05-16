"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Imports_1 = require("../Imports");
/**
 * Plan for stage 2:
 * Scenic score is the number of trees visible from any one tree (the view is blocked by any tree greater than or equal to the origianl tree, larger trees behind such a tree are blocked from view)
 * What is the scenic score of the tree with the greatest scendc score
 *
 * Options:
 * 1) can we use the same approach again, I don't think so. We need to start our investigaton from the individual tree each time
 * 2) Increment through each tree individually and check each direction
 */
function calculateScenicValue(treeArrays, treeRow, treeCol) {
    var currentTreeHeight = treeArrays[treeRow][treeCol];
    // right
    var scenicValR = 0;
    for (var i = treeRow + 1; i < treeArrays.length; i++) {
        if (treeArrays[i][treeCol] < currentTreeHeight)
            scenicValR++;
        else {
            scenicValR++;
            break;
        }
    }
    // left
    var scenicValL = 0;
    for (var i = treeRow - 1; i >= 0; i--) {
        if (treeArrays[i][treeCol] < currentTreeHeight)
            scenicValL++;
        else {
            scenicValL++;
            break;
        }
    }
    // up
    var scenicValU = 0;
    for (var j = treeCol - 1; j >= 0; j--) {
        if (treeArrays[treeRow][j] < currentTreeHeight)
            scenicValU++;
        else {
            scenicValU++;
            break;
        }
    }
    //down
    var scenicValD = 0;
    for (var j = treeCol + 1; j < treeArrays[0].length; j++) {
        if (treeArrays[treeRow][j] < currentTreeHeight)
            scenicValD++;
        else {
            scenicValD++;
            break;
        }
    }
    return scenicValR * scenicValL * scenicValU * scenicValD;
}
var parsedData = [];
Imports_1.fs.createReadStream("./Day8/data.csv")
    .pipe((0, Imports_1.csv)({ headers: false, separator: "" })) // Parsed using the https://www.npmjs.com/package/csv-parser library
    .on("data", function (data) { return parsedData.push(data); })
    .on("end", function () {
    var maxScenicValue = 0;
    var treeArrays = [];
    // Populate tree arrays
    parsedData.forEach(function (row) {
        var arrayOfNums = [];
        arrayOfNums = row["0"].split("").map(function (val) {
            return parseInt(val);
        });
        treeArrays.push(arrayOfNums);
    });
    // Handle everything
    for (var i = 0; i < treeArrays.length; i++) {
        for (var j = 0; j < treeArrays[0].length; j++) {
            //if (i === 1 && j == 3) console.log("highestTree=" + highestTree + " currentTreeHeight=" + currentTree.height + " currentTreeSeen=" + currentTree.seen);
            var currentScenicVal = calculateScenicValue(treeArrays, i, j);
            if (currentScenicVal > maxScenicValue)
                maxScenicValue = currentScenicVal;
        }
    }
    console.log(maxScenicValue);
});
