const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();
const nodes = [];
input.split(/\r?\n/).forEach((line) => {
    const parts = line.split(" <-> ");
    nodes[parseInt(parts[0])] = parts[1].split(",").map((s) => parseInt(s));
});

const visited = [];
function groupsNode(start) {
    visited[start] = true;
    const queue = [start];
    while (queue.length > 0) {
        const id = queue.shift();
        for (const adj of nodes[id]) {
            if (visited[adj] === undefined) {
                visited[adj] = true;
                queue.push(adj);
            }
        }
    }
}

let groupCount = 0;
for (let i = 0; i < nodes.length; i++) {
    if (visited[i] === undefined) {
        groupsNode(i);
        groupCount++;
    }
}

console.log(`Answer: ${groupCount}`);
console.log(`Run time: ${Date.now() - start} ms`);