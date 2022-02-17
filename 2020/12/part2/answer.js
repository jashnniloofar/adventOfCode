console.time("Run time");
const fs = require("fs");
const input = fs.readFileSync("./input.txt").toString();
const instructions = input.split(/\r?\n/).map((line) => [line[0], +line.slice(1)]);
const rotate = [([x, y]) => [x, y], ([x, y]) => [-y, x], ([x, y]) => [-x, -y], ([x, y]) => [y, -x]];

function follow() {
    let xW = 10;
    let yW = -1;
    let xP = 0;
    let yP = 0;
    instructions.forEach((instruction) => {
        const [action, value] = instruction;
        switch (action) {
            case "N":
                yW -= value;
                break;
            case "S":
                yW += value;
                break;
            case "E":
                xW += value;
                break;
            case "W":
                xW -= value;
                break;
            case "R":
                [xW, yW] = rotate[value / 90]([xW, yW]);
                break;
            case "L":
                [xW, yW] = rotate[4 - value / 90]([xW, yW]);
                break;
            case "F":
                xP += xW * value;
                yP += yW * value;
                break;
        }
    });
    return [xP, yP];
}

function manhattanDistance([x1, y1], [x2, y2] = [0, 0]) {
    return Math.abs(x2 - x1) + Math.abs(y2 - y1);
}

console.log(`Answer: ${manhattanDistance(follow(instructions))}`);
console.timeEnd("Run time");
