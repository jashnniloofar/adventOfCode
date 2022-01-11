const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();
const components = input.split(/\r?\n/).map((line) => line.split("/").map((s) => parseInt(s)));
const ports = {};
components.forEach((component, i) => {
    if (ports[component[0]] === undefined) ports[component[0]] = [];
    if (ports[component[1]] === undefined) ports[component[1]] = [];
    ports[component[0]].push(i);
    ports[component[1]].push(i);
});

function longestPath(path, start) {
    let max = 0;
    for (const port of ports[start]) {
        if (!path.includes(port)) {
            const end = components[port][0] === start ? components[port][1] : components[port][0];
            max = Math.max(longestPath([...path, port], end) + components[port][1] + components[port][0], max);
        }
    }
    return max;
}

console.log(`Answer: ${longestPath([], 0)}`);
console.log(`Run time: ${Date.now() - start} ms`);
