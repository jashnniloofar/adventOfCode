console.time("Run time");
const fs = require("fs");
const input = fs.readFileSync("./input.txt").toString();
const map = input.split(/\r?\n/);
// const height = map.length;
// const width = map[0].length;

function isOccupied(map, x, y) {
    if (map[y] === undefined) return false;
    if (map[y][x] === undefined) return false;
    return map[y][x] === "#";
}

function adjOccupied(map, x, y) {
    return (
        isOccupied(map, x - 1, y - 1) +
        isOccupied(map, x - 1, y) +
        isOccupied(map, x - 1, y + 1) +
        isOccupied(map, x, y - 1) +
        isOccupied(map, x, y + 1) +
        isOccupied(map, x + 1, y - 1) +
        isOccupied(map, x + 1, y) +
        isOccupied(map, x + 1, y + 1)
    );
}

function tick(map) {
    const out = [];
    let changedCount = 0;
    let occupied = 0;
    for (let y = 0; y < map.length; y++) {
        out[y] = "";
        for (let x = 0; x < map[y].length; x++) {
            if (map[y][x] === "L" && adjOccupied(map, x, y) === 0) {
                out[y] += "#";
                changedCount++;
            } else if (map[y][x] === "#" && adjOccupied(map, x, y) >= 4) {
                out[y] += "L";
                changedCount++;
            } else {
                out[y] += map[y][x];
            }
            occupied += out[y][x] === "#";
        }
    }
    return { out, changedCount, occupied };
}

function findLoop(map) {
    let current = map;
    while (true) {
        const result = tick(current);
        if (result.changedCount === 0) return result.occupied;
        current = result.out;
    }
}

console.log(`Answer: ${findLoop(map)}`);
console.timeEnd("Run time");
