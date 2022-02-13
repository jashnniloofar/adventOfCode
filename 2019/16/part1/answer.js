const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();
const signal = input.split("").map(Number);
const pattern = [0, 1, 0, -1];

function fft() {
    for (let i = 0; i < signal.length; i++) {
        let result = 0;
        for (let j = i; j < signal.length; j++) {
            result += pattern[Math.floor((j + 1) / (i + 1)) % 4] * signal[j];
        }
        signal[i] = Math.abs(result) % 10;
    }
}

for (let index = 0; index < 100; index++) {
    fft();
}

console.log(`Answer: ${signal.slice(0, 8).join("")}`);
console.log(`Run time: ${Date.now() - start} ms`);
