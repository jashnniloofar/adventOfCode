const fs = require("fs");

const input = fs.readFileSync("./input.txt").toString();
const inputs = input
    .split(",")
    .map((p) => parseInt(p))
    .sort((a, b) => a - b);
const distances = [0];
function calcFuelCost(distance) {
    if (distance === 0) return 0;
    distances[distance] = calcFuelCost(distance - 1) + distance;
    return distances[distance];
}

function calcDistance(inputs, distances, pos) {
    let sumDistances = 0;
    for (let index = 0; index < inputs.length; index++) {
        sumDistances += distances[Math.abs(pos - inputs[index])];
    }
    return sumDistances;
}
calcFuelCost(inputs[inputs.length - 1]);
let min = Number.MAX_VALUE;
for (let pos = 0; pos < inputs[inputs.length - 1]; pos++) {
    const current = calcDistance(inputs, distances, pos);
    if (current < min) {
        min = current;
    }
}

console.log(`Answer: ${min}`);
