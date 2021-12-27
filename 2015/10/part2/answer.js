const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();

function nextStep(str) {
    let out = "";
    let count = 0;
    let char = str[0];
    str = str + "=";
    for (let index = 0; index < str.length; index++) {
        if (str[index] === char) count++;
        else {
            out += `${count}${char}`;
            count = 1;
            char = str[index];
        }
    }
    return out;
}

let str = input
for (let i = 0; i < 50; i++) {
    str = nextStep(str)
}

console.log(`Answer: ${str.length}`);
console.log(`Run time: ${Date.now() - start} ms`);
