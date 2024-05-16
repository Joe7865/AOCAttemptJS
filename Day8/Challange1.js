"use strict";
/*const fs = require("fs");
const csv = require("csv-parser");*/
Object.defineProperty(exports, "__esModule", { value: true });
var Imports_1 = require("../Imports");
var parsedData = [];
Imports_1.fs.createReadStream("./Day8/data.csv")
    .pipe((0, Imports_1.csv)({ headers: false, separator: "" })) // Parsed using the https://www.npmjs.com/package/csv-parser library
    .on("data", function (data) { return parsedData.push(data); })
    .on("end", function () {
    var visTreeCount = 0;
    var treeArrays = [];
    // Populate tree arrays
    parsedData.forEach(function (row) {
        var arrayOfNums = [];
        arrayOfNums = row["0"].split("").map(function (val) {
            return { height: parseInt(val), seen: false };
        });
        treeArrays.push(arrayOfNums);
    });
    //console.log(treeArrays);
    // Handle rows
    for (var i = 0; i < treeArrays.length; i++) {
        //console.log(treeArrays[i]);
        // Left to right
        var highestTree = -1;
        for (var j = 0; j < treeArrays[0].length; j++) {
            var currentTree = treeArrays[i][j];
            //if (i === 1 && j == 3) console.log("highestTree=" + highestTree + " currentTreeHeight=" + currentTree.height + " currentTreeSeen=" + currentTree.seen);
            if (highestTree < currentTree.height) {
                highestTree = currentTree.height;
                if (!currentTree.seen) {
                    treeArrays[i][j].seen = true;
                    visTreeCount++;
                }
            }
        }
        // right to left
        highestTree = -1;
        for (var j = treeArrays[0].length - 1; j >= 0; j--) {
            var currentTree = treeArrays[i][j];
            //console.log(treeArrays);
            //console.log(i + "," + j);
            //if (i === 1 && j == 3) console.log("highestTree=" + highestTree + " currentTreeHeight=" + currentTree.height + " currentTreeSeen=" + currentTree.seen);
            if (highestTree < currentTree.height) {
                highestTree = currentTree.height;
                if (!currentTree.seen) {
                    treeArrays[i][j].seen = true;
                    visTreeCount++;
                }
            }
        }
    }
    //console.log(treeArrays);
    // Handle columns
    for (var j = 0; j < treeArrays[0].length; j++) {
        // top to bottom
        var highestTree = -1;
        for (var i = 0; i < treeArrays.length; i++) {
            var currentTree = treeArrays[i][j];
            //if (i === 1 && j == 3) console.log("highestTree=" + highestTree + " currentTreeHeight=" + currentTree.height + " currentTreeSeen=" + currentTree.seen);
            if (highestTree < currentTree.height) {
                highestTree = currentTree.height;
                if (!currentTree.seen) {
                    treeArrays[i][j].seen = true;
                    visTreeCount++;
                }
            }
        }
        // bottom to top
        highestTree = -1;
        for (var i = treeArrays.length - 1; i >= 0; i--) {
            var currentTree = treeArrays[i][j];
            //if (i === 1 && j == 3) console.log("highestTree=" + highestTree + " currentTreeHeight=" + currentTree.height + " currentTreeSeen=" + currentTree.seen);
            if (highestTree < currentTree.height) {
                highestTree = currentTree.height;
                if (!currentTree.seen) {
                    treeArrays[i][j].seen = true;
                    visTreeCount++;
                }
            }
        }
    }
    //console.log(treeArrays);
    console.log(visTreeCount);
});
