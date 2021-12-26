const fs = require("fs");

const input = fs.readFileSync("./input.txt").toString();
const lines = input.split(/\r?\n/);
const map = [];
lines.forEach((line) => {
    map.push(line.split("").map((p) => parseInt(p)));
});

const mapLength = 10;

function increaseAll(map) {
    for (let i = 0; i < mapLength; i++) {
        for (let j = 0; j < mapLength; j++) {
            map[i][j]++;
        }
    }
}

function increaseAdjacents(map, i, j) {
    if (i > 0 && map[i - 1][j] !== 0) map[i - 1][j]++;
    if (i < mapLength - 1 && map[i + 1][j] !== 0) map[i + 1][j]++;
    if (j > 0 && map[i][j - 1] !== 0) map[i][j - 1]++;
    if (j < mapLength - 1 && map[i][j + 1] !== 0) map[i][j + 1]++;
    if (i > 0 && j > 0 && map[i - 1][j - 1] !== 0) map[i - 1][j - 1]++;
    if (i > 0 && j < mapLength - 1 && map[i - 1][j + 1] !== 0) map[i - 1][j + 1]++;
    if (i < mapLength - 1 && j > 0 && map[i + 1][j - 1] !== 0) map[i + 1][j - 1]++;
    if (i < mapLength - 1 && j < mapLength - 1 && map[i + 1][j + 1] !== 0) map[i + 1][j + 1]++;
}

function getFlashPos(map) {
    for (let i = 0; i < mapLength; i++) {
        for (let j = 0; j < mapLength; j++) {
            if (map[i][j] >= 10) return { i, j };
        }
    }
    return null;
}
function printMap(map) {
    for (let index = 0; index < map.length; index++) {
        console.log(`${map[index]}`);
    }
    console.log("------------------");
}

function oneStep(map) {
    increaseAll(map);
    let flashPos = getFlashPos(map);
    let flashCount = 0;
    while (flashPos !== null) {
        flashCount++;
        map[flashPos.i][flashPos.j] = 0;
        increaseAdjacents(map, flashPos.i, flashPos.j);
        flashPos = getFlashPos(map);
    }
    return flashCount;
}
let total = 0;
for (let index = 0; index < 100; index++) {
    total = total + oneStep(map);
}

console.log(`Answer: ${total}`);
