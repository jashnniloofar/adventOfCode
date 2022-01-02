const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();
let count = [{}, {}, {}, {}, {}, {}, {}, {}];
const charCount = 8;
input.split(/\r?\n/).forEach((line) => {
    for (let i = 0; i < line.length; i++) {
        count[i][line[i]] = count[i][line[i]] ? count[i][line[i]] + 1 : 1;
    }
});

let message = "";
for (let i = 0; i < charCount; i++) {
    let min = Number.MAX_SAFE_INTEGER;
    let char = "";
    for (const [key, value] of Object.entries(count[i])) {
        if (value < min) {
            min = value;
            char = key;
        }
    }
    message += char;
}

console.log(`Answer: ${message}`);
console.log(`Run time: ${Date.now() - start} ms`);
