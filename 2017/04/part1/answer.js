const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();
const passphrases = input.split(/\r?\n/);

let count = 0
for (const passphrase of passphrases) {
    count += !/([a-z]+).* \1( |$)/.test(passphrase)
}

console.log(`Answer: ${count}`);
console.log(`Run time: ${Date.now() - start} ms`);