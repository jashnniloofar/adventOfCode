const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();
const lines = input.split(/\r?\n/);
const depth = +lines[0].match(/[\d]+/);
const [targetX, targetY] = lines[1].match(/[\d]+/g).map((s) => +s);
const map = [];

const maxX = targetX + 50;
const maxY = targetY + 50;
function calcMap(depth) {
    const eI = [];
    for (let y = 0; y <= maxY; y++) {
        eI[y] = [];
        map[y] = [];
        for (let x = 0; x <= maxX; x++) {
            let gI = 0;
            if (y === 0) gI = x * 16807;
            else if (x === 0) gI = y * 48271;
            else if (x === targetX && y === targetY) gI = 0;
            else gI = eI[y - 1][x] * eI[y][x - 1];
            eI[y][x] = (gI + depth) % 20183;
            map[y][x] = eI[y][x] % 3;
        }
    }
}

function getKey(x, y, tool) {
    return `${x},${y},${tool}`;
}

const directions = [([x, y]) => [x + 1, y], ([x, y]) => [x, y + 1], ([x, y]) => [x - 1, y], ([x, y]) => [x, y - 1]];

function pickMin(queue) {
    let min = Number.MAX_SAFE_INTEGER;
    let minIndex;
    queue.forEach((e, i) => {
        if (e[3] < min) {
            min = e[3];
            minIndex = i;
        }
    });
    min = queue[minIndex];
    queue.splice(minIndex, 1);
    return min;
}

const shortestPath = new Map();
function dijkstra() {
    calcMap(depth);
    let queue = [[0, 0, 1, 0]];
    while (queue.length > 0) {
        const [x, y, tool, cost] = pickMin(queue);
        if (y === targetY && x === targetX && tool === 1) return cost;
        const key = getKey(x, y, tool);
        if (shortestPath.has(key)) continue;
        shortestPath.set(key, cost);
        for (const direction of directions) {
            const [nextX, nextY] = direction([x, y]);
            const nextKey = getKey(nextX, nextY, tool);
            if (
                nextX >= 0 &&
                nextX <= maxX &&
                nextY <= maxY &&
                nextY >= 0 &&
                map[nextY][nextX] !== tool &&
                (!shortestPath.has(nextKey) || shortestPath.get(nextKey) > cost + 1)
            ) {
                queue.push([nextX, nextY, tool, cost + 1]);
            }
        }

        for (let i = 0; i < 3; i++) {
            const nextKey = getKey(x, y, i);
            if (map[y][x] !== i && (!shortestPath.has(nextKey) || shortestPath.get(nextKey) > cost + 7)) {
                queue.push([x, y, i, cost + 7]);
            }
        }
    }
}

console.log(`Answer: ${dijkstra()}`);
console.log(`Run time: ${Date.now() - start} ms`);
