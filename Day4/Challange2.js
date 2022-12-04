const fs = require("fs");
const csv = require("csv-parser");


// Accpet the range of sections assigned to the first and second elf and check if it is overlapping at all
function CalculateIfOverlap(firstElfRange, secondElfRange) {
    if ((parseInt(firstElfRange.split("-")[0]) <= parseInt(secondElfRange.split("-")[0]) 
            && parseInt(firstElfRange.split("-")[1]) >= parseInt(secondElfRange.split("-")[0])) 
        || (parseInt(firstElfRange.split("-")[0]) <= parseInt(secondElfRange.split("-")[1]) 
            && parseInt(firstElfRange.split("-")[1]) >= parseInt(secondElfRange.split("-")[1])) 
        || ((parseInt(firstElfRange.split("-")[0]) <= parseInt(secondElfRange.split("-")[0]) 
                && parseInt(firstElfRange.split("-")[1]) >= parseInt(secondElfRange.split("-")[1])) 
            || (parseInt(firstElfRange.split("-")[0]) >= parseInt(secondElfRange.split("-")[0]) 
                && parseInt(firstElfRange.split("-")[1]) <= parseInt(secondElfRange.split("-")[1]))))
    return true;
}

const parsedData = [];  
fs.createReadStream('./Day4/data.csv')
    .pipe(csv({headers : ["FirstElf", "SecondElf"], separator : ","})) // Parsed using the https://www.npmjs.com/package/csv-parser library
    .on('data', (data) => parsedData.push(data))
    .on('end', () => {
        //Parsed data in this format: [{ FirstElf: '3-4', SecondElf: '4-7' }, ...]
        let totalOverlappingPairs = 0;
        parsedData.forEach((elfPair) => {
            if (CalculateIfOverlap(elfPair.FirstElf, elfPair.SecondElf)) totalOverlappingPairs++;
        });
        console.log(totalOverlappingPairs);
  });

// Some overlap scenarios:
// 1) 3-4,4-5
// 2) 3-4,2-3
// 3) 3-4,3-4
// 4) 3-5,4-4 



