const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();
const masses = input.split(/\r?\n/).map(Number);

function getFuel(mass) {
    if (mass < 9) return 0;
    const fuel = Math.floor(mass / 3) - 2;
    return fuel + getFuel(fuel);
}

const fuel = masses.reduce((sum, mass) => (sum += getFuel(mass)), 0);

console.log(`Answer: ${fuel}`);
console.log(`Run time: ${Date.now() - start} ms`);
