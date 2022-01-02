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
input.split(/\, /).forEach((instruction) => {
    if (instruction.startsWith("R")) direction++;
    else direction--;
    direction = (direction + 4) % 4;
    current = directions[direction](current, parseInt(instruction.substr(1)));
});

console.log(`Answer: ${Math.abs(current[0]) + Math.abs(current[1])}`);
console.log(`Run time: ${Date.now() - start} ms`);
