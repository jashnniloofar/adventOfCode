console.time("Run time");
const fs = require("fs");
const input = fs.readFileSync("./input.txt").toString();
const lines = input.split(/\r?\n/);

console.log(`Answer: ${lines.length}`);
console.timeEnd("Run time");
