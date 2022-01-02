const fs = require("fs");
const crypto = require("crypto");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();

function md5(input) {
    let md5sum = crypto.createHash("md5");
    md5sum.update(input);
    return md5sum.digest().toString("hex");
}
let password = [];
let nonce = 0;
let count = 0;
while (count < 8) {
    nonce++;
    const hash = md5(input + nonce);
    if (hash.startsWith("00000")) {
        pos = parseInt(hash[5], 16);
        if (pos < 8 && password[pos] === undefined) {
            password[pos] = hash[6];
            count++;
        }
    }
}

console.log(`Answer: ${password.join("")}`);
console.log(`Run time: ${Date.now() - start} ms`);
