const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString().replace(/\s/, "");

function decompress(str) {
    const match = str.match(/\([0-9]+\x[0-9]+\)/);
    if (match === null) return str.length;
    const index = match.index;
    const [len, count] = match[0].match(/[0-9]+/g).map((s) => parseInt(s));
    return index + count * decompress(str.substr(index + match[0].length, len)) + decompress(str.substr(index + match[0].length + len));
}


console.log(`Answer: ${decompress(input)}`);
console.log(`Run time: ${Date.now() - start} ms`);
