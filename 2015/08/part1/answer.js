const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();
let dif = 0;
input.split(/\r?\n/).forEach((line) => {
    dif += line.length + 2;
    line = line.replace(/\\x([0-9a-f]{2})/gi, function (_, pair) {
        return String.fromCharCode(parseInt(pair, 16));
    });
    line = line.replace(/\\\"/gi, '"')
    line = line.replace(/\\\\/gi, '\\')
    dif-=line.length
});

console.log(`Answer: ${dif}`);
console.log(`Run time: ${Date.now() - start} ms`);
