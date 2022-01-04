const fs = require("fs");
const crypto = require("crypto");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();

function md5(input) {
    let md5sum = crypto.createHash("md5");
    md5sum.update(input);
    return md5sum.digest().toString("hex");
}

function solve() {
    index = 1;
    let foundKey = 0;
    const triple = [];
    const five = [];
    while (true) {
        if (triple.length === 0) {
            let hash = "";
            do {
                index++;
                hash = md5(input + index);
            } while (!/(.)\1\1/.test(hash));
            triple.push([hash.match(/(.)\1\1/)[0], index]);
        }
        const [key, keyIndex] = triple.shift();
        for (index + 1; index < keyIndex + 1000 + 1; index++) {
            const hash = md5(input + index);
            if (/(.)\1\1/.test(hash)) triple.push([hash.match(/(.)\1\1/)[0], index]);
            if (/(.)\1\1\1\1/.test(hash)) five.push([hash.match(/(.)\1\1\1\1/)[0], index]);
        }
        if (five.find((element) => element[1] > keyIndex && element[1] < keyIndex + 1002 && element[0] === key + key[0] + key[0])) foundKey++;
        if (foundKey >= 64) return keyIndex;
    }
}
console.log(`Answer: ${solve()}`);
console.log(`Run time: ${Date.now() - start} ms`);
