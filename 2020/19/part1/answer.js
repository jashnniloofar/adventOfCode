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

function getRegex(id) {
    if (rules[id].regex) return rules[id].regex;
    let regex = "";
    for (const expression of rules[id].exp) {
        regex = regex + expression.reduce((res, id) => (res += getRegex(id)), "") + "|";
    }
    return "(" + regex.slice(0, -1) + ")";
}
console.log(getRegex(0));
const regex = new RegExp("^" + getRegex(0) + "$");
const validCount = messages.reduce((count, msg) => (count += regex.test(msg)), 0);

console.log(`Answer: ${validCount}`);
console.timeEnd("Run time");
