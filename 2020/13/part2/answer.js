console.time("Run time");
const fs = require("fs");
const input = fs.readFileSync("./input.txt").toString();
const ids = input.split(/\r?\n/)[1].split(",");
const buses = [];
ids.forEach((id, index) => {
    if (id !== "x") {
        id = +id;
        buses.push({ id, delay: (id - (index % id)) % id });
    }
});

function earliestTime() {
    let step = 1;
    let time = 0;
    buses.forEach((bus) => {
        const { id, delay } = bus;
        while (time % id !== delay) {
            time += step;
        }
        step *= id;
    });
    return time;
}

console.log(`Answer: ${earliestTime(buses)}`);
console.timeEnd("Run time");
