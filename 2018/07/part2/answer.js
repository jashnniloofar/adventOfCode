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

function solve(requirements, workersCount, step) {
    let buf = [];
    let waiting = Object.keys(requirements).filter((c) => requirements[c].prerequisites.length === 0);
    let time = 0;
    do {
        waiting = waiting.sort();
        while (waiting.length > 0 && buf.length < workersCount) {
            const node = waiting.shift();
            buf.push([node, time + node.charCodeAt(0) + step - 64]);
        }
        const [node, t] = buf.shift();
        time = t;
        for (const child of requirements[node].children) {
            requirements[child].prerequisites = requirements[child].prerequisites.filter((pre) => pre !== node);
            if (requirements[child].prerequisites.length === 0) waiting.push(child);
        }
    } while (buf.length > 0 || waiting.length > 0);
    return time;
}

console.log(`Answer: ${solve(requirements, 5, 60)}`);
console.log(`Run time: ${Date.now() - start} ms`);
