const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();

const target = parseInt(input);

let a = [];
for (let i = 2; i < 1000000; i++) {
    if (a[i] === undefined) a[i] = i + 1;
    for (let j = i * i; j < 1000000; j += i) {
        a[j] = a[j] ? a[j] : j + 1;
        a[j] += i + j / i;
    }
}
let i = 3;
while (a[i] < target / 10) {
    i++;
}
console.log(`Answer: ${i}`);
console.log(`Run time: ${Date.now() - start} ms`);
