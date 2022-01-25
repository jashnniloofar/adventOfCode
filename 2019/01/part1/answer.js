const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();
const masses = input.split(/\r?\n/).map(Number);

const fuel = masses.reduce((sum, v) => (sum += Math.floor(v / 3) - 2), 0);

console.log(`Answer: ${fuel}`);
console.log(`Run time: ${Date.now() - start} ms`);
