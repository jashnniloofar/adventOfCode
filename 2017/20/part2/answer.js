const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();
const particles = input.split(/\r?\n/).map((line) => {
    return { values: line.split(", ").map((triple) => triple.match(/\-?[0-9]+/g).map((s) => parseInt(s))) };
});

function position(particle, t) {
    const [p, v, a] = particle;
    const coe = (t * (t + 1)) / 2;
    return [a[0] * coe + v[0] * t + p[0], a[1] * coe + v[1] * t + p[1], a[2] * coe + v[2] * t + p[2]];
}

function collision(particles, t) {
    const point = {};
    for (const particle of particles) {
        const key = position(particle.values, t).join(",");
        particle.key = key;
        point[key] = point[key] !== undefined ? point[key] + 1 : 1;
    }
    return particles.filter((particle) => point[particle.key] === 1);
}
let current = particles;

for (let i = 0; i < 200; i++) {
    current = collision(current, i);
}

console.log(`Answer: ${current.length}`);
console.log(`Run time: ${Date.now() - start} ms`);
