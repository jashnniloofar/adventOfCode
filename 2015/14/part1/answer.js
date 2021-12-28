const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();
const flies = input.split(/\r?\n/).map((line) => line.match(/[0-9]+/g).map((a) => parseInt(a)));

function distance(fly, sec) {
    const [speed, flyTime, restTime] = fly;
    return (Math.floor(sec / (flyTime + restTime)) * flyTime + Math.min(flyTime, sec % (flyTime + restTime))) * speed;
}
const distances = flies.map((fly) => distance(fly, 2503));

console.log(`Answer: ${Math.max(...distances)}`);
console.log(`Run time: ${Date.now() - start} ms`);
