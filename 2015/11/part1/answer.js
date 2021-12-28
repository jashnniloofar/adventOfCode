const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();

let current = input;
for (let i = 0; i < input.length; i++) {
    if (["i", "l", "o"].includes(current[i])) {
        current = current.substring(0, i) + String.fromCharCode(current.charCodeAt(i) + 1) + "aaaaaaaa".substring(i + 1, 8);
    }
}

function nextPassword(pass) {
    let i = 7;
    while (pass[i] === "z") {
        i--;
    }
    let charCode = pass.charCodeAt(i) + 1;
    if ([105, 108, 111].includes(charCode)) charCode++;
    return pass.substring(0, i) + String.fromCharCode(charCode) + "aaaaaaaa".substring(i + 1, 8);
}

function validate(pass) {
    return /abc|bcd|cde|def|efg|fgh|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz/.test(pass) && /(.)\1.*(.)\2/.test(pass);
}

while (!validate(current)) {
    current = nextPassword(current);
}

console.log(`Answer: ${current}`);
console.log(`Run time: ${Date.now() - start} ms`);
