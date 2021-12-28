const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();
let current = input;

function openBracketIndex(str, index) {
    let count = 0;
    while (count !== 1) {
        index--;
        if (str[index] === "{") count++;
        else if (str[index] === "}") count--;
    }
    if (index > 0 && str[index - 1] === ",") index--;
    return index;
}
function closeBracketIndex(str, index) {
    let count = 0;
    while (count !== 1) {
        index++;
        if (str[index] === "{") count--;
        else if (str[index] === "}") count++;
    }
    return index;
}
function removeRed(str, index) {
    return str.substring(0, openBracketIndex(str, index)) + str.substring(closeBracketIndex(str, index) + 1);
}
let redIndex;
do {
    redIndex = current.search(/: *\"red\"/);
    if (redIndex > 0) {
        current = removeRed(current, redIndex);
    }
} while (redIndex > 0);

let sum = 0;
current.match(/\-?[0-9]+/g).forEach((s) => (sum += parseInt(s)));

console.log(`Answer: ${sum}`);
console.log(`Run time: ${Date.now() - start} ms`);
