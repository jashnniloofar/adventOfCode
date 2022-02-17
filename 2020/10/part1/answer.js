console.time("Run time");
const fs = require("fs");
const input = fs.readFileSync("./input.txt").toString();
const adapters = [0].concat(
    input
        .split(/\r?\n/)
        .map(Number)
        .sort((a, b) => a - b)
);
function solve() {
    let dif1 = 0;
    let dif3 = 0;
    for (let i = 0; i < adapters.length - 1; i++) {
        const dif = adapters[i + 1] - adapters[i];
        if (dif === 1) dif1++;
        else if (dif == 3) dif3++;
    }
    return dif1 * (dif3 + 1);
}

console.log(`Answer: ${solve()}`);
console.timeEnd("Run time");
