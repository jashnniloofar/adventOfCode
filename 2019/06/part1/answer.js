const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();
const parents = {};
input.split(/\r?\n/).forEach((line) => {
    const [parent, child] = line.split(")");
    parents[child] = parent;
});

const orbits = {};
function calcOrbits(node) {
    if (parents[node] === undefined) orbits[node] = 0;
    if (orbits[node] === undefined) {
        orbits[node] = 1 + calcOrbits(parents[node]);
    }
    return orbits[node];
}

const sum = Object.keys(parents).reduce((sum, v) => (sum += calcOrbits(v)), 0);

console.log(`Answer: ${sum}`);
console.log(`Run time: ${Date.now() - start} ms`);
