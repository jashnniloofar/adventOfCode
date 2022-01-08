const fs = require("fs");
let start = Date.now();
const hexes = fs.readFileSync("./input.txt").toString().split(",");

const directions = {
    n: ([x, y, z]) => [x - 1, y + 1, z],
    ne: ([x, y, z]) => [x, y + 1, z - 1],
    se: ([x, y, z]) => [x + 1, y, z - 1],
    s: ([x, y, z]) => [x + 1, y - 1, z],
    sw: ([x, y, z]) => [x, y - 1, z + 1],
    nw: ([x, y, z]) => [x - 1, y, z + 1],
};

function distance(pos) {
    return Math.max(...pos.map(Math.abs));
}

let max = 0;
let position = [0, 0, 0];
for (const hex of hexes) {
    position = directions[hex](position);
    max = Math.max(distance(position), max);
}

console.log(`Answer: ${max}`);
console.log(`Run time: ${Date.now() - start} ms`);
