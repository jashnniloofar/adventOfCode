const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();
const parents = {};
input.split(/\r?\n/).forEach((line) => {
    const [parent, child] = line.split(")");
    parents[child] = parent;
});

const orbits = {};
function pathToRoot(node) {
    const path = [];
    while (parents[node] !== undefined) {
        path.push(parents[node]);
        node = parents[node];
    }
    return path;
}

function transfers(node1, node2) {
    const parents1 = pathToRoot(node1);
    const parents2 = pathToRoot(node2);
    for (let index1 = 0; index1 < parents1.length; index1++) {
        const index2 = parents2.findIndex((p2) => p2 === parents1[index1]);
        if (index2 >= 0) return index1 + index2;
    }
}

console.log(`Answer: ${transfers("YOU", "SAN")}`);
console.log(`Run time: ${Date.now() - start} ms`);
