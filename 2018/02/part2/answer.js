const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();
const lines = input.split(/\r?\n/);

function diff() {
    for (let i = 0; i < lines.length; i++) {
        for (let j = i + 1; j < lines.length; j++) {
            const str = `${lines[i]},${lines[j]}`;
            if (/^(.*)(.)(.*)\,\1.\3$/.test(str)) return str.replace(/^(.*)(.)(.*)\,\1.\3$/, "$1$3");
        }
    }
}
console.log(`Answer: ${diff()}`);
console.log(`Run time: ${Date.now() - start} ms`);
