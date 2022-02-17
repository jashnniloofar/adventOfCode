console.time("Run time");
const fs = require("fs");
const input = fs.readFileSync("./input.txt").toString();
const adapters = [0].concat(
    input
        .split(/\r?\n/)
        .map(Number)
        .sort((a, b) => a - b)
);

const arrangements = [1];
function arrangementsCount(index) {
    if (arrangements[index]) return arrangements[index];
    let count = 0;
    let j = index - 1;
    while (adapters[index] - adapters[j] < 4) {
        count += arrangementsCount(j);
        j--;
    }
    arrangements[index] = count;
    return count;
}

console.log(`Answer: ${arrangementsCount(adapters.length - 1)}`);
console.timeEnd("Run time");
