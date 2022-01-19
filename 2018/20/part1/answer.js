const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();

const neighbors = {};
const directions = { N: ([x, y]) => [x, y - 1], S: ([x, y]) => [x, y + 1], W: ([x, y]) => [x - 1, y], E: ([x, y]) => [x + 1, y] };

function addNeighbor(room, neighbor) {
    if (neighbors[room] === undefined) neighbors[room] = [];
    neighbors[room].push(neighbor);
}
function findRooms(input, start) {
    let prev = start;
    for (let index = 0; index < input.length; index++) {
        const char = input[index];
        if (char === "(") {
            let paranCount = 1;
            let i = index + 1;
            while (paranCount > 0) {
                if (input[i] === ")") paranCount--;
                if (input[i] === "(") paranCount++;
                i++;
            }
            findRooms(input.slice(index + 1, i - 1), prev);
            index = i - 1;
        } else if (char === "|") {
            prev = start;
        } else if (["N", "E", "W", "S"].includes(char)) {
            const [x, y] = directions[char](prev.split(",").map((s) => +s));
            const newNeighbor = `${x},${y}`;
            addNeighbor(newNeighbor, prev);
            addNeighbor(prev, newNeighbor);
            prev = newNeighbor;
        }
    }
}

function maxPath(start) {
    const queue = [[start, 0]];
    const steps = {};
    while (queue.length > 0) {
        const [room, step] = queue.shift();
        if (steps[room]) continue;
        steps[room] = step;
        for (const neighbor of neighbors[room]) {
            queue.push([neighbor, step + 1]);
        }
    }
    let max = 0;
    Object.values(steps).forEach((v) => (max = Math.max(v, max)));
    return max;
}

findRooms(input.slice(1, -1), "0,0");

console.log(`Answer: ${maxPath("0,0")}`);
console.log(`Run time: ${Date.now() - start} ms`);
