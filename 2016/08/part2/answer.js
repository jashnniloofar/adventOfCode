const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();
const lines = input.split(/\r?\n/);
const rowSize = 6;
const colSize = 50;
let map = [];
for (const line of lines) {
    const nextMap = [];
    const nums = line.match(/-?[0-9]+/g).map((p) => parseInt(p));

    if (line.startsWith("rect")) {
        nextMap.push([0, nums[0], 0, nums[1]]);
        const [xMin1, xMax1, yMin1, yMax1] = [0, nums[0], 0, nums[1]];
        for (const rect of map) {
            const [xMin2, xMax2, yMin2, yMax2] = rect;
            if (xMin2 > xMax1 || yMin2 > yMax1 || xMax2 < xMin1 || yMax2 < yMin1) {
                nextMap.push(rect);
                continue;
            }
            const xPoints = [xMin2, ...[xMin1, xMax1].filter((x) => xMin2 < x && x < xMax2), xMax2];
            const yPoints = [yMin2, ...[yMin1, yMax1].filter((y) => yMin2 < y && y < yMax2), yMax2];
            for (let i = 0; i < xPoints.length - 1; i++) {
                const nextXMin = xPoints[i];
                const nextXMax = xPoints[i + 1];
                for (let j = 0; j < yPoints.length - 1; j++) {
                    const nextYMin = yPoints[j];
                    const nextYMax = yPoints[j + 1];
                    const nextRect = [nextXMin, nextXMax, nextYMin, nextYMax];

                    // if nextRect extends beyond currentRect
                    if (nextXMin < xMin1 || nextYMin < yMin1 || nextXMax > xMax1 || nextYMax > yMax1) {
                        nextMap.push(nextRect);
                    }
                }
            }
        }
    }
    if (line.startsWith("rotate column")) {
        const [x, shift] = nums;
        for (const rect of map) {
            const [xMin, xMax, yMin, yMax] = rect;
            if (xMin > x || xMax <= x) {
                nextMap.push(rect);
                continue;
            }
            if (xMin !== x) nextMap.push([xMin, x, yMin, yMax]);
            if (xMax !== x + 1) nextMap.push([x + 1, xMax, yMin, yMax]);

            const [sMin, sMax] = [(yMin + shift) % rowSize, ((yMax + shift - 1) % rowSize) + 1];
            if (sMin < sMax) nextMap.push([x, x + 1, sMin, sMax]);
            else {
                nextMap.push([x, x + 1, sMin, rowSize]);
                nextMap.push([x, x + 1, 0, sMax]);
            }
        }
    }
    if (line.startsWith("rotate row")) {
        const [y, shift] = nums;
        for (const rect of map) {
            const [xMin, xMax, yMin, yMax] = rect;
            if (yMin > y || yMax <= y) {
                nextMap.push(rect);
                continue;
            }
            if (yMin !== y) nextMap.push([xMin, xMax, yMin, y]);
            if (yMax !== y + 1) nextMap.push([xMin, xMax, y + 1, yMax]);

            const [sMin, sMax] = [(xMin + shift) % colSize, ((xMax + shift - 1) % colSize) + 1];
            if (sMin < sMax) nextMap.push([sMin, sMax, y, y + 1]);
            else {
                nextMap.push([sMin, colSize, y, y + 1]);
                nextMap.push([0, sMax, y, y + 1]);
            }
        }
    }
    map = nextMap;
}
const screen = [];
for (let i = 0; i < rowSize; i++) {
    screen[i] = [];
    for (let j = 0; j < colSize; j++) {
        screen[i][j] = ".";
    }
}
for (const rect of map) {
    const [xMin, xMax, yMin, yMax] = rect;
    for (let i = yMin; i < yMax; i++) {
        for (let j = xMin; j < xMax; j++) {
            screen[i][j] = "#";
        }
    }
}
for (let i = 0; i < rowSize; i++) {
    console.log(screen[i].join(" "));
}

console.log(`Run time: ${Date.now() - start} ms`);
