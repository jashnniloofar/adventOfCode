const fs = require("fs");

const input = fs.readFileSync("./input.txt").toString();
const lines = input.split(/\r?\n/);
const map = [];
lines.forEach((line) => {
    map.push(line.split(""));
});
const length = map.length;
const width = map[0].length;

function printMap(map) {
    map.forEach((line) => {
        console.log(`${line}`);
    });
}

function basinSize(map, i, j) {
    if (i < 0 || j < 0 || i >= length || j >= width || map[i][j] === "9") return 0;
    map[i][j] = "9";
    return 1 + basinSize(map, i, j - 1) + basinSize(map, i, j + 1) + basinSize(map, i - 1, j) + basinSize(map, i + 1, j);
}

let basins = [];

for (let i = 0; i < length; i++) {
    for (let j = 0; j < width; j++) {
        let isLow = true;
        if (j > 0 && map[i][j] >= map[i][j - 1]) isLow = false;
        if (j < width - 1 && map[i][j] >= map[i][j + 1]) isLow = false;
        if (i > 0 && map[i][j] >= map[i - 1][j]) isLow = false;
        if (i < length - 1 && map[i][j] >= map[i + 1][j]) isLow = false;
        if (isLow) {
            basins.push(basinSize(map, i, j));
        }
    }
}
basins = basins.sort((a, b) => b - a);
console.log(`Answer: ${basins[0] * basins[1] * basins[2]}`);
