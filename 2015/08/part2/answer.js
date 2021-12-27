const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();
let dif = 0;
input.split(/\r?\n/).forEach((line) => {
    dif -= line.length;
    line = line.replace(/\\/gi, "\\\\");
    line = line.replace(/\"/gi, '\\"');
    dif += line.length + 2;
});

console.log(`Answer: ${dif}`);
console.log(`Run time: ${Date.now() - start} ms`);
