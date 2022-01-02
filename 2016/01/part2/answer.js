const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();
let current = [0, 0];
const directions = [
    (point, v) => [point[0], point[1] + v],
    (point, v) => [point[0] + v, point[1]],
    (point, v) => [point[0], point[1] - v],
    (point, v) => [point[0] - v, point[1]],
];
let direction = 0;
let index = 0;
const visited = new Map();

function draw(source, destination) {
    const [x1, x2] = [source[0], destination[0]].sort((a, b) => a - b);
    const [y1, y2] = [source[1], destination[1]].sort((a, b) => a - b);
    visited.delete(`${source[0]},${source[1]}`)
    for (let i = x1; i <= x2; i++) {
        for (let j = y1; j <= y2; j++) {
            if (visited.has(`${i},${j}`)) return [i, j];
            visited.set(`${i},${j}`, 1);
        }
    }
    return null;
}
let hq = null;
const instructions = input.split(/\, /);
while (hq === null && index < instructions.length) {
    if (instructions[index].startsWith("R")) direction++;
    else direction--;
    direction = (direction + 4) % 4;
    let next = directions[direction](current, parseInt(instructions[index].substr(1)));
    hq = draw(current, next);
    current = next;
    index++;
}
console.log(`Answer: ${Math.abs(hq[0]) + Math.abs(hq[1])}`);
console.log(`Run time: ${Date.now() - start} ms`);
