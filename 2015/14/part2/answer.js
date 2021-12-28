const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();
const flies = input.split(/\r?\n/).map((line) => line.match(/[0-9]+/g).map((a) => parseInt(a)));

function distance(fly, sec) {
    const [speed, flyTime, restTime] = fly;
    return (Math.floor(sec / (flyTime + restTime)) * flyTime + Math.min(flyTime, sec % (flyTime + restTime))) * speed;
}
const points = flies.map(() => 0);
for (let i = 1; i <= 2503; i++) {
    const distances = flies.map((fly) => distance(fly, i));
    const max = Math.max(...distances);
    distances.forEach((d, i) => (points[i] = points[i] + (d === max ? 1 : 0)));
}

console.log(`Answer: ${Math.max(...points)}`);
console.log(`Run time: ${Date.now() - start} ms`);