const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();
const [first, last] = input.split("-").map(Number);

let count = 0;
for (let n = first; n < last; n++) {
    const s = n.toString().replace(/(\d)\1{2,}/g, "$1");
    if (/(\d)\1/.test(s)) {
        let enc = true;
        for (let j = 0; j < s.length - 1; j++) {
            if (s[j + 1] < s[j]) enc = false;
        }
        count+=enc;
    }
}

console.log(`Answer: ${count}`);
console.log(`Run time: ${Date.now() - start} ms`);
