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

function strength(path) {
    let out = 0;
    for (const component of path) {
        out += components[component][0] + components[component][1];
    }
    return out;
}

let maxLength = 0;
let maxStrength = 0;
function longestPath(path, start) {
    for (const port of ports[start]) {
        if (!path.includes(port)) {
            const end = components[port][0] === start ? components[port][1] : components[port][0];
            longestPath([...path, port], end);
        }
    }
    if (path.length > maxLength) {
        maxLength = path.length;
        maxStrength = 0;
    }
    if (path.length === maxLength) maxStrength = Math.max(maxStrength, strength(path));
}

longestPath([], 0)
console.log(`Answer: ${maxStrength}`);
console.log(`Run time: ${Date.now() - start} ms`);
