const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();
const words = input.split(/\r?\n/);

let niceWords = 0;
for (const word of words) {
    if (/(..).*\1/.test(word) && /(.).\1/.test(word)) niceWords++;
}

console.log(`Answer: ${niceWords}`);
console.log(`Run time: ${Date.now() - start} ms`);
