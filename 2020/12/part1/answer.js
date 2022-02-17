console.time("Run time");
const fs = require("fs");
const input = fs.readFileSync("./input.txt").toString();
const instructions = input.split(/\r?\n/).map((line) => [line[0], +line.slice(1)]);
const directions = [([x, y, d]) => [x + d, y], ([x, y, d]) => [x, y + d], ([x, y, d]) => [x - d, y], ([x, y, d]) => [x, y - d]];

function follow() {
    let x = 0;
    let y = 0;
    let dir = 0;
    instructions.forEach((instruction) => {
        const [action, value] = instruction;
        switch (action) {
            case "N":
                y -= value;
                break;
            case "S":
                y += value;
                break;
            case "E":
                x += value;
                break;
            case "W":
                x -= value;
                break;
            case "R":
                dir = (dir + value / 90) % 4;
                break;
            case "L":
                dir = (dir + 4 - value / 90) % 4;
                break;
            case "F":
                [x, y] = directions[dir]([x, y, value]);
                break;
        }
    });
    return [x, y];
}

function manhattanDistance([x1, y1], [x2, y2] = [0, 0]) {
    return Math.abs(x2 - x1) + Math.abs(y2 - y1);
}

console.log(`Answer: ${manhattanDistance(follow(instructions))}`);
console.timeEnd("Run time");
