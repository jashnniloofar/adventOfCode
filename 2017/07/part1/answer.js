const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();
const nodes = {};
input.split(/\r?\n/).forEach((line) => {
    const [node, weight, ...children] = line.match(/([0-9a-z]+)/g);
    nodes[node] = { ...nodes[node], weight: parseInt(weight), children };
    for (const child of children) {
        if (nodes[child] === undefined) nodes[child] = {};
        nodes[child].parent = node;
    }
});

function root(object) {
    for (const [node, obj] of Object.entries(object)) {
        if (obj.parent === undefined) return node;
    }
}

console.log(`Answer: ${root(nodes)}`);
console.log(`Run time: ${Date.now() - start} ms`);
