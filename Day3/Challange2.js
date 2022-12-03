const fs = require("fs");
const csv = require("csv-parser");

const lowerLetters = 'abcdefghijklmnopqrstuvwxyz';
const allLetters = lowerLetters + lowerLetters.toUpperCase();

// Accept an array of lists of items for each group member and return the priority of the badge
function CalculateBadgePriority(Items) {
    let firstBackpack = Items[0];
    let secondBackpack = Items[1];
    let thirdBackpack = Items[2];
    let commonLetter = '';
    for (let i = 0; i < firstBackpack.length; i++) {
        let candidateLetter = firstBackpack[i];
        if (secondBackpack.includes(candidateLetter) && thirdBackpack.includes(candidateLetter)) {
            commonLetter = candidateLetter;
            break;
        }
    }
    return allLetters.indexOf(commonLetter) + 1;
}

const parsedData = [];  
fs.createReadStream('./Day3/data.csv')
    .pipe(csv({headers : ["Items"], separator : " "})) // Parsed using the https://www.npmjs.com/package/csv-parser library
    .on('data', (data) => parsedData.push(data))
    .on('end', () => {
        //Parsed data in this format: [{ Items: 'AbsdKd' }, ...]
        let priorityTotal = 0;
        let groupPacks = [];
        parsedData.forEach((backpack) => {
            groupPacks.push(backpack.Items);
            if ( groupPacks.length === 3 ) {
                priorityTotal += CalculateBadgePriority(groupPacks);
                groupPacks = [];
            }
        });
        console.log(priorityTotal);
  });



