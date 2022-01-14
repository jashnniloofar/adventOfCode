const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();
const requirements = {};
input
    .split(/\r?\n/)
    .map((step) => step.match(/Step ([A-Z]) must be finished before step ([A-Z]) can begin/).slice(1))
    .forEach(([pre, post]) => {
        if (requirements[pre] === undefined) requirements[pre] = { children: [], prerequisites: [] };
        if (requirements[post] === undefined) requirements[post] = { children: [], prerequisites: [] };
        requirements[pre].children.push(post);
        requirements[post].prerequisites.push(pre);
    });

let buf = Object.keys(requirements).filter((c) => requirements[c].prerequisites.length === 0);
const visited = [];
while (buf.length > 0) {
    buf = buf.sort();
    const node = buf.shift();
    visited.push(node);
    for (const child of requirements[node].children) {
        requirements[child].prerequisites = requirements[child].prerequisites.filter((pre) => pre !== node);
        if (requirements[child].prerequisites.length === 0) buf.push(child);
    }
}

console.log(`Answer: ${visited.join("")}`);
console.log(`Run time: ${Date.now() - start} ms`);
