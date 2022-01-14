const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();
const licence = input.split(" ").map((s) => parseInt(s));

function sumMeta(start) {
    const childrenCount = licence[start];
    const metaDataCount = licence[start + 1];
    let sum = 0;
    start = start + 2;
    for (let i = 0; i < childrenCount; i++) {
        const [childSum, end] = sumMeta(start);
        sum += childSum;
        start = end;
    }
    for (let i = 0; i < metaDataCount; i++) {
        sum += licence[start + i];
    }
    return [sum, start + metaDataCount];
}

console.log(`Answer: ${sumMeta(0)[0]}`);
console.log(`Run time: ${Date.now() - start} ms`);
