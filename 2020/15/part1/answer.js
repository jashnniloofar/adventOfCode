console.time("Run time");
const fs = require("fs");
const input = fs.readFileSync("./input.txt").toString();
const startingNumbers = input.split(",").map(Number);
const history = {};

function spoken(turn) {
    for (let i = 0; i < startingNumbers.length - 1; i++) {
        history[startingNumbers[i]] = i;
    }
    let current = 0;
    let previous = startingNumbers[startingNumbers.length - 1];
    for (let i = startingNumbers.length + 1; i <= turn; i++) {
        if (history[previous] !== undefined) current = i - history[current] - 2;
        else current = 0;
        history[previous] = i - 2;
        previous = current;
    }
    return current;
}

console.log(`Answer: ${spoken(2020)}`);
console.timeEnd("Run time");
