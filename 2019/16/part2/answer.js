const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();
const signal = input.split("").map(Number);
const offset = +input.slice(0, 7);

let current = [];
for (let index = offset; index < signal.length * 10000; index++) {
    current[index - offset] = signal[index % signal.length];
}

function fft() {
    for (let i = current.length - 1; i >= 0; i--) {
        current[i] = ((current[i + 1] || 0) + current[i]) % 10;
    }
}

for (let index = 0; index < 100; index++) {
    fft();
}

console.log(`Answer: ${current.slice(0, 8).join("")}`);
console.log(`Run time: ${Date.now() - start} ms`);
