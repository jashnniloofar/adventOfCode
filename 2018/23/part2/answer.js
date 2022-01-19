const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();
let minX = 0;
let maxX = 0;
let minY = 0;
let maxY = 0;
let minZ = 0;
let maxZ = 0;
const nanobots = input.split(/\r?\n/).map((line) => {
    const [x, y, z, r] = line.match(/\-?\d+/g).map(Number);
    minX = Math.min(minX, x);
    maxX = Math.max(maxX, x);
    minY = Math.min(minY, y);
    maxY = Math.max(maxY, y);
    minZ = Math.min(minZ, z);
    maxZ = Math.max(maxZ, z);
    return [x, y, z, r];
});

function manhatanDistance([x1, y1, z1], [x2, y2, z2] = [0, 0, 0]) {
    return Math.abs(x2 - x1) + Math.abs(y2 - y1) + Math.abs(z2 - z1);
}

function bestPoint() {
    let searchSize = Math.min(maxX - minX, maxY - minY, maxZ - minZ);
    let bestGrid;

    while (searchSize > 0) {
        let maxCount = 0;

        for (let x = minX; x < maxX + 1; x += searchSize) {
            for (let y = minY; y < maxY + 1; y += searchSize) {
                for (let z = minZ; z < maxZ + 1; z += searchSize) {
                    let count = 0;
                    for (const [ax, ay, az, r] of nanobots) {
                        let dist = manhatanDistance([x, y, z], [ax, ay, az]);
                        if (dist - r < searchSize) {
                            count++;
                        }
                    }
                    if (maxCount < count) {
                        maxCount = count;
                        bestGrid = [x, y, z];
                    } else if (maxCount === count) {
                        if (!bestGrid || manhatanDistance([x, y, z]) < manhatanDistance(bestGrid)) {
                            bestGrid = [x, y, z];
                        }
                    }
                }
            }
        }
        minX = bestGrid[0] - searchSize;
        maxX = bestGrid[0] + searchSize;
        minY = bestGrid[1] - searchSize;
        maxY = bestGrid[1] + searchSize;
        minZ = bestGrid[2] - searchSize;
        maxZ = bestGrid[2] + searchSize;
        searchSize = Math.floor(searchSize / 2);
    }
    return manhatanDistance(bestGrid)
}

console.log(`Answer: ${bestPoint()}`);
console.log(`Run time: ${Date.now() - start} ms`);
