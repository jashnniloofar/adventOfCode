const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();
const lines = input.split(/\r?\n/);

const result = lines.reduce(
    (a, c) => {
        const chars = [...c];
        let seen = {};
        for (let char of chars) {
            seen[char] = (seen[char] || 0) + 1;
        }

        if (Object.keys(seen).some((k) => seen[k] === 2)) a[0]++;
        if (Object.keys(seen).some((k) => seen[k] === 3)) a[1]++;
        return a;
    },
    [0, 0]
);

console.log(`Answer: ${result[0] * result[1]}`);
console.log(`Run time: ${Date.now() - start} ms`);
