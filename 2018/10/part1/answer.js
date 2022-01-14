const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();
const points = input.split(/\r?\n/).map((line) => line.match(/\-?\d+/g).map((s) => +s));

function calcSize(time) {
    let minX = Number.MAX_SAFE_INTEGER;
    let minY = Number.MAX_SAFE_INTEGER;
    let maxX = Number.MIN_SAFE_INTEGER;
    let maxY = Number.MIN_SAFE_INTEGER;

    for (const point of points) {
        const [pX, pY, vX, vY] = point;
        minX = Math.min(minX, pX + vX * time);
        maxX = Math.max(maxX, pX + vX * time);
        minY = Math.min(minY, pY + vY * time);
        maxY = Math.max(maxY, pY + vY * time);
    }
    return [maxX, minX, maxY, minY];
}

function draw(time) {
    const [maxX, minX, maxY, minY] = calcSize(time);
    const map = [];
    for (let y = minY; y < maxY + 1; y++) {
        map[y - minY] = [];
        for (let x = minX; x < maxX + 1; x++) {
            map[y - minY][x - minX] = " ";
        }
    }
    for (const point of points) {
        const [pX, pY, vX, vY] = point;
        map[pY + vY * time - minY][pX + vX * time - minX] = "#";
    }
    for (let y = minY; y < maxY + 1; y++) {
        console.log(map[y - minY].join(" "));
    }
}

let current = Number.MAX_SAFE_INTEGER;
let next = Number.MAX_SAFE_INTEGER;
let i = -1;
do {
    i++;
    current = next;
    const [maxX, minX, maxY, minY] = calcSize(i);
    next = (maxX - minX) * (maxY - minY);
} while (next < current);

draw(i - 1);
console.log(`Run time: ${Date.now() - start} ms`);
