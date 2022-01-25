const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();
const wires = [];
input.split(/\r?\n/).forEach((line) => {
    const wire = { x: [], y: [] };
    let x = 0;
    let y = 0;
    let d = 0;
    line.split(",").forEach((part) => {
        const direction = part[0];
        const v = +part.slice(1);
        if (direction === "U") {
            wire.y.push([x, y - v, y, d, 2]);
            y -= v;
        } else if (direction === "D") {
            wire.y.push([x, y, y + v, d, 1]);
            y += v;
        } else if (direction === "R") {
            wire.x.push([x, y, x + v, d, 0]);
            x += v;
        } else {
            wire.x.push([x - v, y, x, d, 2]);
            x -= v;
        }
        d += v;
    });
    wires.push(wire);
});

let min = Infinity;
for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 2; j++) {
        if (i !== j) {
            wires[i].x.forEach((vertical) => {
                wires[j].y.forEach((horizontal) => {
                    const [vx1, vy, vx2, vd, vs] = vertical;
                    const [hx, hy1, hy2, hd, hs] = horizontal;
                    if (vy >= hy1 && vy <= hy2 && hx >= vx1 && hx <= vx2) {
                        const dist = vd + hd + Math.abs(hx - vertical[vs]) + Math.abs(vy - horizontal[hs]);

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
