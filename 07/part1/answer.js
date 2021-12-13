const fs = require("fs");

const input = fs.readFileSync("./input.txt").toString();
const inputs = input
    .split(",")
    .map((p) => parseInt(p))
    .sort((a, b) => a - b);

function calcMedian(inputs) {
    let medianPosition = Math.ceil(inputs.length / 2);
    let median = inputs[medianPosition];
    if (inputs.length % 2 === 0) {
        median = (inputs[medianPosition] + inputs[medianPosition - 1]) / 2;
    }
    return median;
}
let sumDistances = 0;
const median = calcMedian(inputs);
for (let index = 0; index < inputs.length; index++) {
    sumDistances += Math.abs(median - inputs[index]);
}
console.log(`Answer: ${sumDistances}`);
