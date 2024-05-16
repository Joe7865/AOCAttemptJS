const fs = require("fs");
const csv = require("csv-parser");
const { log } = require("console");

/**
 * Plan:
 * Need to find the total size of each directory (total size of all files it contains, directly and indirectly)
 * Find all the directories with size less than or equal to 100000 and sume these sizes up.
 * 1) Reformat the data into a dictionary with key being the directory path and the value being the size of all first child files.
 * 2) Second run I update the dictionary to also include the size of 2nd child files etc.
 * 3) Go through the final dict and sum up any numbers less than or equal to 100000
 *
 * {
 * "/sdflsj/asdfasd" : 234234
 * }
 */

const parsedData = [];
fs.createReadStream("./Day7/data.csv")
    .pipe(
        csv({
            headers: ["DollarDirSize", "CommandFileFolder", "NewFolder"],
            separator: " ",
        })
    ) // Parsed using the https://www.npmjs.com/package/csv-parser library
    .on("data", (data) => parsedData.push(data))
    .on("end", () => {
        //Parsed data in this format: [{ FirstElf: '3-4', SecondElf: '4-7' }, ...]
        let currentLocation = "";
        let dirSizeDict = {};
        parsedData.forEach((line) => {
            //console.log(line.DollarDirSize);
            //console.log(line.CommandFileFolder);
            //console.log(line.NewFolder);
            if (line.DollarDirSize === "$" && line.CommandFileFolder === "cd") {
                if (line.NewFolder !== "..") {
                    if (currentLocation !== "" && currentLocation.charAt(currentLocation.length - 1) !== "/")
                        currentLocation += "/";
                    currentLocation += line.NewFolder;
                } else {
                    let splatPath = currentLocation.split("/");
                    splatPath.splice(-1, 1);
                    currentLocation = splatPath.join("/");
                    if (currentLocation === "") currentLocation += "/";
                }
                //console.log(currentLocation);
            }
            if (line.DollarDirSize !== "$" && line.DollarDirSize !== "dir") {
                let sizeOfFile = parseInt(line.DollarDirSize);
                /*if (currentLocation === "/fmfnpm/wrzcjwc/lddhdslh/gzj")
                        console.log(line.DollarDirSize + ": " + sizeOfFile);
                    if (currentLocation === "/fmfnpm/wrzcjwc/lddhdslh/gzj") console.log(dirSizeDict);*/
                if (dirSizeDict[currentLocation] === undefined) {
                    dirSizeDict[currentLocation] = sizeOfFile;
                } else {
                    dirSizeDict[currentLocation] = dirSizeDict[currentLocation] + sizeOfFile;
                }
                // TODO: We could at this stage increment up the tree and add the sizes to parent directories
                let dirPath = currentLocation;
                while (dirPath !== "/") {
                    /*if (dirPath === "/fmfnpm/wrzcjwc/lddhdslh/gzj")
                            console.log(line.DollarDirSize + ": " + sizeOfFile);
                        if (dirPath === "/fmfnpm/wrzcjwc/lddhdslh/gzj") console.log(dirSizeDict);*/
                    let splatPath = dirPath.split("/");
                    splatPath.splice(-1, 1);
                    dirPath = splatPath.join("/");
                    if (dirPath === "") dirPath += "/";
                    if (dirSizeDict[dirPath] === undefined) {
                        dirSizeDict[dirPath] = sizeOfFile;
                    } else {
                        dirSizeDict[dirPath] = dirSizeDict[dirPath] + sizeOfFile;
                    }
                }
            }
        });

        // TODO: Find smallest 
        let smallestDirToDelete = 100000000;
        for (const [key, value] of Object.entries(dirSizeDict)) {
            if (value >= 6090134 && value < smallestDirToDelete) smallestDirToDelete = value;
        }

        console.log(smallestDirToDelete);
        //console.log(dirSizeDict['/']); // Found that we need to delete 6090134 more to get to 30,000,000 free space 
    });
