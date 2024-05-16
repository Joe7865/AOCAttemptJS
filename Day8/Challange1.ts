/*const fs = require("fs");
const csv = require("csv-parser");*/

import {fs, csv} from "../Imports";

let parsedData: string[] = [];
fs.createReadStream("./Day8/data.csv")
    .pipe(csv({ headers: false, separator: "" })) // Parsed using the https://www.npmjs.com/package/csv-parser library
    .on("data", (data: string) => parsedData.push(data))
    .on("end", () => {
        let visTreeCount = 0;
        let treeArrays: {height: number, seen: boolean}[][] = [];

        // Populate tree arrays
        parsedData.forEach((row) => {
            let arrayOfNums = [];
            arrayOfNums = row["0"].split("").map((val) => {
                return {height: parseInt(val), seen: false};
            });
            treeArrays.push(arrayOfNums);
        });
        //console.log(treeArrays);

        // Handle rows
        for (let i = 0; i < treeArrays.length; i++) {

            //console.log(treeArrays[i]);
            // Left to right
            let highestTree = -1;
            for (let j = 0; j < treeArrays[0].length; j++) {
                let currentTree = treeArrays[i][j];
                //if (i === 1 && j == 3) console.log("highestTree=" + highestTree + " currentTreeHeight=" + currentTree.height + " currentTreeSeen=" + currentTree.seen);
                if (highestTree < currentTree.height) {
                    highestTree = currentTree.height;
                    if (!currentTree.seen){
                        treeArrays[i][j].seen = true;
                        visTreeCount++;
                    }
                }
            }

            // right to left
            highestTree = -1;
            for (let j = treeArrays[0].length - 1; j >= 0; j--) {
                let currentTree = treeArrays[i][j];
                //console.log(treeArrays);
                //console.log(i + "," + j);
                //if (i === 1 && j == 3) console.log("highestTree=" + highestTree + " currentTreeHeight=" + currentTree.height + " currentTreeSeen=" + currentTree.seen);
                if (highestTree < currentTree.height) {
                    highestTree = currentTree.height;
                    if (!currentTree.seen){
                        treeArrays[i][j].seen = true;
                        visTreeCount++;
                    }
                }
            }
        }
        //console.log(treeArrays);

        // Handle columns
        for (let j = 0; j < treeArrays[0].length; j++) {
            // top to bottom
            let highestTree = -1;
            for (let i = 0; i < treeArrays.length; i++) {
                let currentTree = treeArrays[i][j];
                //if (i === 1 && j == 3) console.log("highestTree=" + highestTree + " currentTreeHeight=" + currentTree.height + " currentTreeSeen=" + currentTree.seen);
                if (highestTree < currentTree.height) {
                    highestTree = currentTree.height;
                    if (!currentTree.seen){
                        treeArrays[i][j].seen = true;
                        visTreeCount++;
                    }
                }
            }

            // bottom to top
            highestTree = -1;
            for (let i = treeArrays.length - 1; i >= 0; i--) {
                let currentTree = treeArrays[i][j];
                //if (i === 1 && j == 3) console.log("highestTree=" + highestTree + " currentTreeHeight=" + currentTree.height + " currentTreeSeen=" + currentTree.seen);
                if (highestTree < currentTree.height) {
                    highestTree = currentTree.height;
                    if (!currentTree.seen){
                        treeArrays[i][j].seen = true;
                        visTreeCount++;
                    }
                }
            }
        }

        //console.log(treeArrays);

        console.log(visTreeCount);
    });
