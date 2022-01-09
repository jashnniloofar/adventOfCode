const fs = require("fs");
let start = Date.now();
const step = parseInt(fs.readFileSync("./input.txt").toString());
const total = 50000000;

function valueAt(target) {
    let pos = 0,
        value = 0;
    for (let i = 1; i <= total; i++) {
        pos = ((pos + step) % i) + 1;
        if (pos === target) {
            value = i;
        }
    }
    return value;
}

console.log(`Answer: ${valueAt(1)}`);
console.log(`Run time: ${Date.now() - start} ms`);
