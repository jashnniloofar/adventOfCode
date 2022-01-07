const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();
const lines = input.split(/\r?\n/).map((line) => line.split("\t").map((s) => parseInt(s.trim())));

function divisible(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] % arr[j] === 0) return arr[i] / arr[j];
            if (arr[j] % arr[i] === 0) return arr[j] / arr[i];
        }
    }
}
let sum = 0;
for (const line of lines) {
    sum+=divisible(line)
}
console.log(`Answer: ${sum}`);
console.log(`Run time: ${Date.now() - start} ms`);
