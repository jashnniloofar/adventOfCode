const fs = require("fs");
let start = Date.now();
const step = parseInt(fs.readFileSync("./input.txt").toString());
const total = 2017

function insertValue(buffer, pos, value) {
    let remain = step+1;
    do {
        pos = pos !== 0 ? pos - 1 : total;
        if (buffer[pos] === undefined) remain--;
    } while (remain !== 0);
    
    buffer[pos] = value;
    return pos;
}

const buffer = [];
let pos = total;
let value = total;
do {
    buffer[pos] = value;
    value--;
    pos = insertValue(buffer, pos, value);
} while (buffer[0] === undefined);

console.log(`Answer: ${buffer[0]}`);
console.log(`Run time: ${Date.now() - start} ms`);
