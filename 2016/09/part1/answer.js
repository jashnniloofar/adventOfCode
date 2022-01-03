const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString().replace(/\s/, "");

let decompressedLength = 0;
let str = input;
while (str.match(/\([0-9]+\x[0-9]+\)/) !== null) {
    const match = str.match(/\([0-9]+\x[0-9]+\)/);
    const index = match.index;
    const [len, count] = match[0].match(/[0-9]+/g).map((s) => parseInt(s));
    decompressedLength = decompressedLength + index + len * count;
    str = str.substring(index + match[0].length + len);
}
decompressedLength += str.length

console.log(`Answer: ${decompressedLength}`);
console.log(`Run time: ${Date.now() - start} ms`);
