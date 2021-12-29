const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();

const target = parseInt(input);

let a = [];
let min = Number.MAX_VALUE;
for (let i = 1; i < 1000000; i++) {
    for (let j = i * 2; j < 51 * i; j += i) {
        a[j] = a[j] ? a[j] + i : i + j;
        if (a[j] > target / 11 && j < min) min = j;
    }
}
console.log(`Answer: ${min}`);
console.log(`Run time: ${Date.now() - start} ms`);
