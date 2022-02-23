console.time("Run time");
const fs = require("fs");
const input = fs.readFileSync("./input.txt").toString();
let current = new Set();
input.split(/\r?\n/).forEach((line, y) => {
    for (let x = 0; x < line.length; x++) {
        if (line[x] === "#") current.add(`${x},${y},0`);
    }
});

const mapSize = 8;

function neighbors(x, y, z) {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            for (let k = -1; k <= 1; k++) {
                count += current.has(`${x + i},${y + j},${z + k}`);
            }
        }
    }
    return count
}
function tick(cycle) {
    let next = new Set();
    for (let x = -cycle; x < mapSize + cycle; x++) {
        for (let y = -cycle; y < mapSize + cycle; y++) {
            for (let z = -cycle; z <= cycle; z++) {
                const neighborsCount = neighbors(x, y, z);
                // console.log(neighborsCount);
                if (neighborsCount === 3 || (neighborsCount === 4 && current.has(`${x},${y},${z}`))) {
                    next.add(`${x},${y},${z}`);
                }
            }
        }
    }
    return next;
}
for (let i = 1; i <= 6; i++) {
    current = tick(i);
}

console.log(`Answer: ${current.size}`);
console.timeEnd("Run time");
