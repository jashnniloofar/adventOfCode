const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();
const passphrases = input.split(/\r?\n/).map((p) => p.split(" "));

function sort(str) {
    return str.split("").sort().join("");
}
let count = 0;
for (const passphrase of passphrases) {
    let valid = true;
    for (let i = 0; i < passphrase.length; i++) {
        for (let j = i + 1; j < passphrase.length; j++) {
            if (sort(passphrase[i]) === sort(passphrase[j])) valid = false;
        }
    }
    count += valid;
}

console.log(`Answer: ${count}`);
console.log(`Run time: ${Date.now() - start} ms`);
