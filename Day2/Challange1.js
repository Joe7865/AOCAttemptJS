const fs = require("fs");
const csv = require("csv-parser");

// Accept Opponents letter and my letter then calculate score
function calculateScore(Opp, Mine) {
    const valueOfShape = {'X' : 1, 'Y' : 2, 'Z' : 3};
    const valueOfOutcome = { 
        'A' : {'X' : 3, 'Y' : 6, 'Z' : 0}, 
        'B' : {'X' : 0, 'Y' : 3, 'Z' : 6},
        'C' : {'X' : 6, 'Y' : 0, 'Z' : 3}
    }
    return valueOfShape[Mine] + valueOfOutcome[Opp][Mine]
}

const parsedData = [];  
fs.createReadStream('./Day2/data.csv')
    .pipe(csv({headers : ["Opponent", "Mine"], separator : " "})) // Parsed using the https://www.npmjs.com/package/csv-parser library
    .on('data', (data) => parsedData.push(data))
    .on('end', () => {
        //Parsed data in this format: [{ Opponent: 'A', Mine: 'Y' }, ...]
        let myTotal = 0;
        parsedData.forEach((turn) => myTotal += calculateScore(turn.Opponent, turn.Mine));
        console.log(myTotal);
  });



