const fs = require("fs");

const input = fs.readFileSync("./input.txt").toString();
const lines = input.split(/\r?\n/);
const map = [];
for (const line of lines) {
    const row = line.split("").map((v) => parseInt(v));
    map.push(row.concat(increaseArray(row, 1)).concat(increaseArray(row, 2)).concat(increaseArray(row, 3)).concat(increaseArray(row, 4)));
}
for (let i = 0; i < 4; i++) {
    for (let j = 0; j < lines.length; j++) {
        map.push(increaseArray(map[j], i + 1));
    }
}

const maxSize = map.length - 1;

function increaseArray(array, val) {
    let result = [];
    for (let i = 0; i < array.length; i++) {
        result[i] = array[i] + val > 9 ? array[i] + val - 9 : array[i] + val;
    }
    return result;
}

function minimumNode(map) {
    let min = Number.MAX_VALUE;
    let result;
    map.forEach((value, key) => {
        if (value < min) {
            min = value;
            result = key;
        }
    });
    return result;
}

function updateNeighbor(current, unvisited, h, v, risk) {
    if (!current.has(`${h},${v}`) || current.get(`${h},${v}`) > risk) {
        current.set(`${h},${v}`, risk);
        unvisited.set(`${h},${v}`, current.get(`${h},${v}`));
    }
}

const unvisited = new Map();
unvisited.set("0,0", 0);
const current = new Map();
current.set("0,0", 0);
do {
    const min = minimumNode(unvisited);
    const h = parseInt(min.split(",")[0]);
    const v = parseInt(min.split(",")[1]);
    const risk = current.get(`${h},${v}`) + map[h][v];
    if (h > 0) updateNeighbor(current, unvisited, h - 1, v, risk);
    if (h < maxSize) updateNeighbor(current, unvisited, h + 1, v, risk);
    if (v > 0) updateNeighbor(current, unvisited, h, v - 1, risk);
    if (v < maxSize) updateNeighbor(current, unvisited, h, v + 1, risk);
    unvisited.delete(`${h},${v}`);
} while (unvisited.size > 0);

console.log(`Answer: ${current.get(`${maxSize},${maxSize}`) + map[maxSize][maxSize] - map[0][0]}`);
