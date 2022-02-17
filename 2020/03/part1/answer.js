const fs = require("fs");
const input = fs.readFileSync("./input.txt").toString();
const map = input.split(/\r?\n/);

function slope(stepX, stepY) {
    let count = 0;
    const rowLength = map[0].length;
    for (let y = 0; y < map.length; y += stepY) {
        count += map[y][(y * stepX) % rowLength] === "#";
    }
    return count;
}

console.time("Run time");
console.log(`Answer: ${slope(3, 1)}`);
console.timeEnd("Run time");
