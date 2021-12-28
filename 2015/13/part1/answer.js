const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();

const people = new Map();
function getCode(city) {
    if (!people.has(city)) people.set(city, people.size);
    return people.get(city);
}

const happiness = new Map();
input.split(/\r?\n/).forEach((line) => {
    const pair = line.match(/[A-Z][a-z]+/g).map((p) => getCode(p));
    const value = parseInt(line.match(/[0-9]+/)[0]);
    if (line.search(" lose ") > 0) setHappiness(pair, -1 * value);
    else setHappiness(pair, value);
});

function setHappiness(pair, value) {
    pair = pair.sort((a, b) => a - b).join(",");
    if (!happiness.has(pair)) happiness.set(pair, 0);
    happiness.set(pair, happiness.get(pair) + value);
}

function getHappiness(a, b) {
    if (happiness.has(`${a},${b}`)) return happiness.get(`${a},${b}`);
    return happiness.get(`${b},${a}`);
}

let usedChars = [];
let permArr = [];
function permute(input) {
    let i, ch;
    for (i = 0; i < input.length; i++) {
        ch = input.splice(i, 1)[0];
        usedChars.push(ch);
        if (input.length == 0) {
            permArr.push(usedChars.slice());
        }
        permute(input);
        input.splice(i, 0, ch);
        usedChars.pop();
    }
    return permArr;
}

const permutes = permute([...people.values()]);
let max = 0;
permutes.forEach((p) => {
    let result = 0;
    for (let i = 0; i < people.size; i++) {
        result += getHappiness(p[i], p[(i + 1) % people.size]);
    }
    if (result > max) {
        max = result
    };
});

console.log(`Answer: ${max}`);
console.log(`Run time: ${Date.now() - start} ms`);
