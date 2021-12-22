const fs = require("fs");

let start = Date.now();
const input = fs.readFileSync("./sample.txt").toString();
const lines = input.split(/\r?\n/);
const steps = [];
for (const line of lines) {
    const command = line.startsWith("on") ? "on" : "off";
    const dimensions = line.match(/-?[0-9]+/g).map((p) => parseInt(p));
    steps.push({ command, dimensions });
}

const map = new Map();
for (const step of steps) {
    if (
        step.dimensions[0] <= 50 &&
        step.dimensions[0] >= -50 &&
        step.dimensions[1] <= 50 &&
        step.dimensions[1] >= -50 &&
        step.dimensions[2] <= 50 &&
        step.dimensions[2] >= -50 &&
        step.dimensions[3] <= 50 &&
        step.dimensions[3] >= -50 &&
        step.dimensions[4] <= 50 &&
        step.dimensions[4] >= -50 &&
        step.dimensions[5] <= 50 &&
        step.dimensions[5] >= -50
    ) {
        for (let x = step.dimensions[0]; x <= step.dimensions[1]; x++) {
            for (let y = step.dimensions[2]; y <= step.dimensions[3]; y++) {
                for (let z = step.dimensions[4]; z <= step.dimensions[5]; z++) {
                    if (step.command === "on") {
                        map.set(`${x},${y},${z}`, 1);
                    } else {
                        map.delete(`${x},${y},${z}`);
                    }
                }
            }
        }
    }
}

console.log(`Answer: ${map.size}`);
console.log(`Run time: ${Date.now() - start} ms`);
