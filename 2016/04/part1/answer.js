const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();
let sum = 0;
const lines = input.split(/\r?\n/).forEach((line) => {
    const [_, code, id, decoy] = line.match(/([a-z\-]+)([0-9]+)\[([a-z]+)\]/);
    if (isValid(code, decoy)) sum += parseInt(id);
});

function isValid(code, decoy) {
    let count = [];
    for (let i = 97; i < 123; i++) {
        const char = String.fromCharCode(i);
        count.push([char, [...code.matchAll(new RegExp(char, "g"))].length]);
    }
    count = count.sort((a, b) => b[1] - a[1]);
    for (let i = 0; i < decoy.length; i++) {
        if (decoy[i] !== count[i][0]) return false;
    }
    return true;
}

console.log(`Answer: ${sum}`);
console.log(`Run time: ${Date.now() - start} ms`);
