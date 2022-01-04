const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();

function checksum(binary) {
    while (binary.length % 2 === 0) {
        let next = "";
        for (let i = 0; i < binary.length; i += 2) {
            next += binary[i] === binary[i + 1] ? "1" : "0";
        }
        binary = next;
    }
    return binary;
}

let binary = input;
while (binary.length < 35651584) {
    binary +=
        "0" +
        binary
            .split("")
            .reverse()
            .map((c) => (c === "0" ? "1" : "0"))
            .join("");
}
binary = binary.substr(0, 35651584);

console.log(`Answer: ${checksum(binary)}`);
console.log(`Run time: ${Date.now() - start} ms`);
