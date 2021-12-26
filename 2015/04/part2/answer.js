const fs = require("fs");
const crypto = require("crypto");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();

function md5(input) {
    let md5sum = crypto.createHash("md5");
    md5sum.update(input);
    return md5sum.digest().toString("hex");
}
let mined = false;
let nonce = 0;
while (!mined) {
    nonce++;
    mined = md5(input + nonce).startsWith("000000");
}

console.log(`Answer: ${nonce}`);
console.log(`Run time: ${Date.now() - start} ms`);
