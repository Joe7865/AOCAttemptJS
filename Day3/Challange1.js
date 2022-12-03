const fs = require("fs");
const csv = require("csv-parser");

const lowerLetters = 'abcdefghijklmnopqrstuvwxyz';
const allLetters = lowerLetters + lowerLetters.toUpperCase();

// Accept the list of items in a backpack and return the priority of the letter common to both compartments
function CalculateCommonLetterPriority(Items) {
    const indexOfMiddleLetter = Items.length/2;
    let firstCompartment = Items.substring(0, indexOfMiddleLetter);
    let secondCompartment = Items.substring(indexOfMiddleLetter);
    let commonLetter = '';
    for (let i = 0; i < firstCompartment.length; i++) {
        if (secondCompartment.includes(firstCompartment[i])) {
            commonLetter = firstCompartment[i];
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
        parsedData.forEach((backpack) => priorityTotal += CalculateCommonLetterPriority(backpack.Items));
        console.log(priorityTotal);
  });



