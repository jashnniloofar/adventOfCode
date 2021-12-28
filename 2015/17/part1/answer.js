const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();
const capacities = input.split(/\r?\n/).map((p) => parseInt(p));

let cap = [];
for (let i = 0; i < capacities.length; i++) {
    cap[i] = [];
}
function knapsack(index, total) {
    if (total < 0) return 0;
    if (total === 0) return 1;
    if (index === capacities.length) return 0;
    if (!cap[index][total]) cap[index][total] = knapsack(index + 1, total - capacities[index]) + knapsack(index + 1, total);
    return cap[index][total];
}

console.log(`Answer: ${knapsack(0, 150)}`);
console.log(`Run time: ${Date.now() - start} ms`);
