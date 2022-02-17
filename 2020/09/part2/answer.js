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

function findRange(target) {
    let start = 0;
    let end = 1;
    let sum = numbers[start] + numbers[end];
    while (sum !== target) {
        if (sum < target) {
            end++;
            sum += numbers[end];
        } else {
            sum -= numbers[start];
            start++;
        }
    }
    return { start, end };
}

const { start, end } = findRange(firstInvalid());
const range = numbers.slice(start, end + 1);

console.log(`Answer: ${Math.min(...range) + Math.max(...range)}`);
console.timeEnd("Run time");
