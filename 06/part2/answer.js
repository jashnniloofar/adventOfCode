const fs = require("fs");

const input = fs.readFileSync("./input.txt").toString();
const inputs = input.split(",").map((p) => parseInt(p));

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

function nex128tDays(inputs, counts) {
    let result = 0;
    for (let index = 0; index < inputs.length; index++) {
        const input = inputs[index];
        result += counts[128 - input];
    }
    return result;
}

const fishes = [1];
const counts = [];
const state = [];
for (let index = 0; index < 129; index++) {
    nextDay(fishes);
    counts[index] = fishes.length;
    if (index > 119) {
        state[index] = fishes.slice();
    }
}

for (let index = 120; index < 128; index++) {
    counts[index + 128] = nex128tDays(state[index], counts);
}

let result = 0;
for (let index = 0; index < inputs.length; index++) {
    const input = inputs[index];
    result += counts[256 - input];
}

console.log(`Answer: ${result}`);
