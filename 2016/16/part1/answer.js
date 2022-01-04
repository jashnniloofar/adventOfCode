const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();

function reverse(binary) {
    let out = "";
    for (let i = 0; i < binary.length; i++) {
        out = binary[i] + out;
    }
    return out;
}

function changeBit(binary) {
    let out = "";
    for (let i = 0; i < binary.length; i++) {
        out += binary[i] === "1" ? "0" : 1;
    }
    return out;
}
function dragonCurve(binary) {
    return binary + "0" + changeBit(reverse(binary));
}

function checksum(binary) {
    while (binary.length % 2 === 0) {
        let next = "";
        for (let i = 0; i < binary.length; i += 2) {
            if (binary[i] === binary[i + 1]) next += "1";
            else next += "0";
        }
        binary = next;
    }
    return binary;
}

let binary = input;
while (binary.length < 272) {
    binary = dragonCurve(binary);
}
console.log(binary);
binary = binary.substr(0, 272);

console.log(`Answer: ${checksum(binary)}`);
console.log(`Run time: ${Date.now() - start} ms`);
