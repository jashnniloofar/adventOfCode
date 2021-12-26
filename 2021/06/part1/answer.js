const fs = require("fs");

const input = fs.readFileSync("./input.txt").toString();
const inputs = input.split(",");

function nextDay(fishes) {
    const count = fishes.length;
    for (let index = 0; index < count; index++) {
        if (fishes[index] === 0) {
            fishes[index] = 6;
            fishes.push(8);
        } else {
            fishes[index]--;
        }
    }
}

const fishes = [1];
const count = [];
for (let index = 0; index < 80; index++) {
    nextDay(fishes);
    count[index] = fishes.length;
}

let result = 0;
for (let index = 0; index < inputs.length; index++) {
    const input = parseInt(inputs[index]);
    result += count[80 - input];
}

console.log(`Answer: ${result}`);
