console.time("Run time");
const fs = require("fs");
const input = fs.readFileSync("./input.txt").toString();

function maskValue(value, mask) {
    const binary = value.toString(2).padStart(mask.length, 0);
    const out = [];
    for (let i = 0; i < mask.length; i++) {
        out[i] = mask[i] !== "0" ? mask[i] : binary[i];
    }
    return out.join("");
}

let mem = {};
let mask = "";
input.split(/\r?\n/).forEach((line) => {
    if (line.indexOf("mask") === 0) {
        mask = line.split(" = ")[1];
    } else if (line.indexOf("mem") === 0) {
        const [address, value] = line.match(/\d+/g).map(Number);
        const masked = maskValue(address, mask);
        const xCount = masked.split("X").length - 1;
        const permuteCount = 1 << xCount;
        for (let i = 0; i < permuteCount; i++) {
            let permuteAddress = "";
            const permute = i.toString(2).padStart(xCount, 0);
            let j = 0;
            for (let index = 0; index < masked.length; index++) {
                if (masked[index] === "X") {
                    permuteAddress += permute[j];
                    j++;
                } else {
                    permuteAddress += masked[index];
                }
            }
            mem[parseInt(permuteAddress, 2)] = value;
        }
    }
});

let sum = 0;
for (let addr in mem) {
    sum += mem[addr];
}

console.log(`Answer: ${sum}`);
console.timeEnd("Run time");
