const fs = require("fs");
let start = Date.now();
const serialNumber = +fs.readFileSync("./input.txt").toString();

function power(i, j) {
    const id = i + 10;
    return Math.floor((((id * j + serialNumber) * id) % 1000) / 100) - 5;
}

function getFeul(x, y) {
    if (x <= 0 || y <= 0) return 0;
    return fuels[x][y];
}
const fuels = [];
for (let i = 1; i <= 300; i++) {
    fuels[i] = [];
    for (let j = 1; j <= 300; j++) {
        fuels[i][j] = power(i, j) + getFeul(i - 1, j) + getFeul(i, j - 1) - getFeul(i - 1, j - 1);
    }
}

function powerSum(x, y, size) {
    return getFeul(x - 1, y - 1) + getFeul(x - 1 + size, y - 1 + size) - getFeul(x - 1, y - 1 + size) - getFeul(x - 1 + size, y - 1);
}

function maxPower(size) {
    let max = Number.MIN_SAFE_INTEGER;
    let corner = "";
    for (let x = 1; x <= 301 - size; x++) {
        for (let y = 1; y <= 301 - size; y++) {
            const sum = powerSum(x, y, size);
            if (sum > max) {
                max = sum;
                corner = `${x},${y}`;
            }
        }
    }
    return { max, corner };
}

let max = Number.MIN_SAFE_INTEGER;
let corner = "";
for (let i = 1; i <= 300; i++) {
    const power = maxPower(i);
    if (power.max > max) {
        max = power.max;
        corner = `${power.corner},${i}`;
    }
}

console.log(`Answer: ${corner}`);
console.log(`Run time: ${Date.now() - start} ms`);
