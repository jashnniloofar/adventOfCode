const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();
const wires = [];
input.split(/\r?\n/).forEach((line) => {
    const wire = { x: [], y: [] };
    let x = 0;
    let y = 0;
    line.split(",").forEach((part) => {
        const direction = part[0];
        const v = +part.slice(1);
        if (direction === "U") {
            wire.y.push([x, y - v, x, y]);
            y -= v;
        } else if (direction === "D") {
            wire.y.push([x, y, x, y + v]);
            y += v;
        } else if (direction === "R") {
            wire.x.push([x, y, x + v, y]);
            x += v;
        } else {
            wire.x.push([x - v, y, x, y]);
            x -= v;
        }
    });
    wires.push(wire);
});

let min = Infinity;
for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 2; j++) {
        if (i !== j) {
            wires[i].x.forEach((vertical) => {
                wires[j].y.forEach((horizontal) => {
                    if (
                        vertical[1] >= horizontal[1] &&
                        vertical[1] <= horizontal[3] &&
                        horizontal[0] >= vertical[0] &&
                        horizontal[0] <= vertical[2]
                    ) {
                        const dist = Math.abs(horizontal[0]) + Math.abs(vertical[1]);
                        if (dist > 0 && dist < min) {
                            min = dist;
                        }
                    }
                });
            });
        }
    }
}

console.log(`Answer: ${min}`);
console.log(`Run time: ${Date.now() - start} ms`);
