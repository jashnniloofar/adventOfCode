const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();

const target = parseInt(input);

let a = [];
for (let i = 2; i <= 50; i++) {
    if (a[i] === undefined) a[i] = i;
    for (let j = i * i; j < 1000000; j += i) {
        a[j] = a[j] ? a[j] : j;
        a[j] += j / i;
    }
}

let i = 3;
while (a[i]===undefined || a[i] < target / 11) {
    i++;
}

console.log(`Answer: ${i}`);
console.log(`Run time: ${Date.now() - start} ms`);
