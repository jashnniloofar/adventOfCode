const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();
const nodes = [];
input.split(/\r?\n/).forEach((line) => {
    const parts = line.split(" <-> ");
    nodes[parseInt(parts[0])] = parts[1].split(",").map((s) => parseInt(s));
});

const visited = [true];
const queue = [0];
let count = 0;
while (queue.length > 0) {
    const id = queue.shift();
    count++;
    for (const adj of nodes[id]) {
        if (visited[adj] === undefined) {
            visited[adj] = true;
            queue.push(adj);
        }
    }
}

console.log(`Answer: ${count}`);
console.log(`Run time: ${Date.now() - start} ms`);
