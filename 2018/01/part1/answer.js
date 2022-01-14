const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();
const lines = input.split(/\r?\n/).map((line) => parseInt(line));

const sum = lines.reduce((previous, value) => previous + value);
console.log(`Answer: ${sum}`);
console.log(`Run time: ${Date.now() - start} ms`);
