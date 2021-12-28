const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();
const capacities = input.split(/\r?\n/).map((p) => parseInt(p));

let cap = [];
for (let i = 0; i < capacities.length; i++) {
    cap[i] = [];
}
function knapsack(index, total, used) {
    if (total < 0) return [];
    if (total === 0) return [used];
    if (index === capacities.length) return [];
    return  cap[index][total] = knapsack(index + 1, total - capacities[index], used + 1).concat(knapsack(index + 1, total, used));
}

const result = knapsack(0, 150, 0).sort((a, b) => a - b);

console.log(`Answer: ${result.filter((x) => x === result[0]).length}`);
console.log(`Run time: ${Date.now() - start} ms`);
