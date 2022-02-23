console.time("Run time");
const fs = require("fs");
const input = fs.readFileSync("./input.txt").toString();
const lines = input.split(/\r?\n/);
const timestamp = +lines[0];
const buses = lines[1]
    .split(",")
    .filter((s) => s !== "x")
    .map(Number);

function earliestBus(buses, timestamp) {
    let min = Infinity;
    let busId = 0;
    buses.forEach((bus) => {
        const next = (bus - (timestamp % bus)) % bus;
        if (next < min) {
            min = next;
            busId = bus;
        }
    });
    return busId * min
}

console.log(`Answer: ${earliestBus(buses, timestamp)}`);
console.timeEnd("Run time");
