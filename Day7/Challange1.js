const fs = require("fs");
const csv = require("csv-parser");


/**
 * Plan:
 * Need to find the total size of each directory (total size of all files it contains, directly and indirectly)
 * Find all the directories with size less than or equal to 100000 and sume these sizes up.
 * 1) Reformat the data into a dictionary. 
 */

// Accpet the range of sections assigned to the first and second elf and check if it is fully overlapping
function CalculateIfFullOverlap(firstElfRange, secondElfRange) {
    if ((parseInt(firstElfRange.split("-")[0]) <= parseInt(secondElfRange.split("-")[0]) 
            && parseInt(firstElfRange.split("-")[1]) >= parseInt(secondElfRange.split("-")[1])) 
        || (parseInt(firstElfRange.split("-")[0]) >= parseInt(secondElfRange.split("-")[0]) 
            && parseInt(firstElfRange.split("-")[1]) <= parseInt(secondElfRange.split("-")[1])) )
    return true;
}

const parsedData = [];  
fs.createReadStream('./Day7/data.csv')
    .pipe(csv({headers : ["DollarDirSize", "CommandFileFolder", "NewFolder"], separator : " "})) // Parsed using the https://www.npmjs.com/package/csv-parser library
    .on('data', (data) => parsedData.push(data))
    .on('end', () => {
        //Parsed data in this format: [{ FirstElf: '3-4', SecondElf: '4-7' }, ...]
        let count = 0;
        let currentLocation = "";
        parsedData.forEach((line) => {
            if (count <= 100) { 
               //console.log(line.DollarDirSize); 
               //console.log(line.CommandFileFolder); 
               //console.log(line.NewFolder); 
               if (line.DollarDirSize === '$' && line.CommandFileFolder === 'cd') {
                   if (line.NewFolder !== '..') {
                        if (currentLocation !== "" && currentLocation.charAt(currentLocation.length - 1) !== '/') currentLocation += '/';
                       currentLocation += (line.NewFolder);
                   } else {
                       let splatPath = currentLocation.split('/'); 
                       splatPath.splice(-1,1);
                       currentLocation = splatPath.join('/');
                       if (currentLocation === "") currentLocation += '/';
                   }
                console.log(currentLocation);
               }
               if (line.DollarDirSize !== '$' && line.DollarDirSize !== 'dir') {
                let sizeOfFile = ParseInt(line.DollarDirSize);
               }

            }
            count++;
        });
        //console.log(totalContainingPairs);
  });



