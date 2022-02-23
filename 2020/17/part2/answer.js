console.time("Run time");
const fs = require("fs");
const input = fs.readFileSync("./input.txt").toString();
let current = new Set();
let mapSize;
input.split(/\r?\n/).forEach((line, y) => {
    mapSize = line.length;
    for (let x = 0; x < line.length; x++) {
        if (line[x] === "#") current.add(`${x},${y},0,0`);
    }
});

function neighbors(x, y, z, w) {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            for (let k = -1; k <= 1; k++) {
                for (let l = -1; l <= 1; l++) {
                    count += current.has(`${x + i},${y + j},${z + k},${w + l}`);
                }
            }
        }
    }
    return count;
}
function tick(cycle) {
    let next = new Set();
    for (let x = -cycle; x < mapSize + cycle; x++) {
        for (let y = -cycle; y < mapSize + cycle; y++) {
            for (let z = -cycle; z <= cycle; z++) {
                for (let w = -cycle; w <= cycle; w++) {
                    const neighborsCount = neighbors(x, y, z, w);
                    if (neighborsCount === 3 || (neighborsCount === 4 && current.has(`${x},${y},${z},${w}`))) {
                        next.add(`${x},${y},${z},${w}`);
                    }
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
