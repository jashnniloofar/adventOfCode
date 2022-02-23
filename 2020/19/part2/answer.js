console.time("Run time");
const fs = require("fs");
const input = fs.readFileSync("./input.txt").toString();
const rules = [];
const messages = [];
input.split(/\r?\n/).forEach((line) => {
    if (/:/.test(line)) {
        const [number, expressions] = line.split(": ");
        if (expressions === '"a"' || expressions === '"b"') {
            rules[number] = { regex: expressions.slice(1, 2) };
        } else {
            rules[number] = { exp: expressions.split(" | ").map((exp) => exp.split(" ")) };
        }
    } else if (line.length) {
        messages.push(line);
    }
});

rules[8] = { exp: [[42], [42, 42], [42, 42, 42], [42, 42, 42, 42], [42, 42, 42, 42, 42]] };
rules[11] = {
    exp: [
        [42, 31],
        [42, 42, 31, 31],
        [42, 42, 42, 31, 31, 31],
        [42, 42, 42, 42, 31, 31, 31, 31],
    ],
};

function getRegex(id) {
    if (rules[id].regex) return rules[id].regex;
    let regex = "";
    for (const expression of rules[id].exp) {
        regex = regex + expression.reduce((res, id) => (res += getRegex(id)), "") + "|";
    }
    return "(" + regex.slice(0, -1) + ")";
}

const regex = new RegExp("^" + getRegex(0) + "$");
const validCount = messages.reduce((count, msg) => (count += regex.test(msg)), 0);

console.log(`Answer: ${validCount}`);
console.timeEnd("Run time");
