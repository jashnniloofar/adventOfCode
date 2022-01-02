const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();
let roomId = 0;
input.split(/\r?\n/).forEach((line) => {
    const [_, code, id, decoy] = line.match(/([a-z\-]+)-([0-9]+)\[([a-z]+)\]/);
    if (isValid(code, decoy)&& decrypt(code, parseInt(id)).startsWith("northpole")){
        roomId = parseInt(id);
    } 
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

function decrypt(code, id) {
    let out = "";
    for (let i = 0; i < code.length; i++) {
        if (code[i] === "-") out += " ";
        else out += String.fromCharCode(((code[i].charCodeAt(0) - 97 + id) % 26) + 97);
    }
    return out;
}

console.log(`Answer: ${roomId}`);
console.log(`Run time: ${Date.now() - start} ms`);
