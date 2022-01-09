const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();
const particles = input.split(/\r?\n/).map((line) => line.split(", ").map((triple) => triple.match(/\-?[0-9]+/g).map((s) => parseInt(s))));

function distance(arr) {
    return Math.abs(arr[0]) + Math.abs(arr[1]) + Math.abs(arr[2]);
}
let minIndex = 0;
for (let index = 0; index < particles.length; index++) {
    const [p, v, a] = particles[index];
    if (
        distance(a) < distance(particles[minIndex][2]) ||
        (distance(a) === distance(particles[minIndex][2]) && distance(v) < distance(particles[minIndex][1])) ||
        (distance(a) === distance(particles[minIndex][2]) &&
            distance(v) === distance(particles[minIndex][1]) &&
            distance(p) < distance(particles[minIndex][0]))
    ) {
        minIndex = index;
    }
}

console.log(`Answer: ${minIndex}`);
console.log(`Run time: ${Date.now() - start} ms`);
