const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();
const licence = input.split(" ").map((s) => parseInt(s));

function value(start) {
    const childrenCount = licence[start];
    const metaDataCount = licence[start + 1];
    let sum = 0;
    start = start + 2;
    if (childrenCount === 0) {
        for (let i = 0; i < metaDataCount; i++) {
            sum += licence[start + i];
        }
        return [sum, start + metaDataCount];
    }
    const children = [];
    for (let i = 0; i < childrenCount; i++) {
        const [sum, end] = value(start);
        children.push(sum);
        start = end;
    }
    for (let i = 0; i < metaDataCount; i++) {
        sum += children[licence[start + i] - 1] || 0;
    }
    return [sum, start + metaDataCount];
}

console.log(`Answer: ${value(0)[0]}`);
console.log(`Run time: ${Date.now() - start} ms`);
