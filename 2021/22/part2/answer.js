const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();
const lines = input.split(/\r?\n/);
let map = [];
for (const line of lines) {
    const on = line.startsWith("on") ? true : false;
    const dimensions = line.match(/-?[0-9]+/g).map((p) => parseInt(p));
    dimensions[1]++;
    dimensions[3]++;
    dimensions[5]++;
    const [xMin1, xMax1, yMin1, yMax1, zMin1, zMax1] = dimensions;

    const nextMap = on ? [dimensions] : [];
    for (const cube of map) {
        const [xMin2, xMax2, yMin2, yMax2, zMin2, zMax2] = cube;
        if (xMin2 > xMax1 || yMin2 > yMax1 || zMin2 > zMax1 || xMax2 < xMin1 || yMax2 < yMin1 || zMax2 < zMin1) {
            nextMap.push(cube);
            continue;
        }
        const xPoints = [xMin2, ...[xMin1, xMax1].filter((x) => xMin2 < x && x < xMax2), xMax2];
        const yPoints = [yMin2, ...[yMin1, yMax1].filter((y) => yMin2 < y && y < yMax2), yMax2];
        const zPoints = [zMin2, ...[zMin1, zMax1].filter((z) => zMin2 < z && z < zMax2), zMax2];
        for (let i = 0; i < xPoints.length - 1; i++) {
            const nextXMin = xPoints[i];
            const nextXMax = xPoints[i + 1];
            for (let j = 0; j < yPoints.length - 1; j++) {
                const nextYMin = yPoints[j];
                const nextYMax = yPoints[j + 1];
                for (let k = 0; k < zPoints.length - 1; k++) {
                    const nextZMin = zPoints[k];
                    const nextZMax = zPoints[k + 1];

                    const nextCube = [nextXMin, nextXMax, nextYMin, nextYMax, nextZMin, nextZMax];

                    // if nextCube extends beyond currentCube
                    if (nextXMin < xMin1 || nextYMin < yMin1 || nextZMin < zMin1 || nextXMax > xMax1 || nextYMax > yMax1 || nextZMax > zMax1) {
                        nextMap.push(nextCube);
                    }
                }
            }
        }
    }
    map = nextMap;
}
let sum = 0;
for (const cube of map) {
    sum += (cube[1] - cube[0]) * (cube[3] - cube[2]) * (cube[5] - cube[4]);
}

console.log(`Answer: ${sum}`);
console.log(`Run time: ${Date.now() - start} ms`);
