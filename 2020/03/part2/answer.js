console.time("Run time");
const fs = require("fs");
const input = fs.readFileSync("./input.txt").toString();
const map = input.split(/\r?\n/);

function slope(stepX, stepY) {
    let count = 0;
    const rowLength = map[0].length;
    for (let y = 0; y < map.length; y += stepY) {
        count += map[y][((y / stepY) * stepX) % rowLength] === "#";
    }
    return count;
}

const result = slope(1, 1) * slope(3, 1) * slope(5, 1) * slope(7, 1) * slope(1, 2);
console.log(`Answer: ${result}`);
console.timeEnd("Run time");
