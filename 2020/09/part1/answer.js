console.time("Run time");
const fs = require("fs");
const input = fs.readFileSync("./input.txt").toString();
const numbers = input.split(/\r?\n/).map(Number);

function isValid(index) {
    if (index < 25) return true;
    for (let i = index - 1; i >= index - 25; i--) {
        for (let j = index - 1; j >= index - 25; j--) {
            if (i !== j && numbers[i] + numbers[j] === numbers[index]) return true;
        }
    }
    return false;
}

function firstInvalid() {
    let index = 0;
    while (isValid(index)) {
        index++;
    }
    return numbers[index];
}

console.log(`Answer: ${firstInvalid()}`);
console.timeEnd("Run time");
