const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();
let count = 0;
input.split(/\r?\n/).forEach((ip) => {
    if (/([a-z])(?!\1)([a-z])\2\1/.test(ip) && !/\[[a-z]*([a-z])(?!\1)([a-z])\2\1[a-z]*\]/.test(ip)) {
        count++;
    }
});


console.log(`Answer: ${count}`);
console.log(`Run time: ${Date.now() - start} ms`);
