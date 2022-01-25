const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();
function readMoons(input) {
    return input.split(/\r?\n/).map((line) => [
        line
            .match(/<x=(-?\d+), y=(-?\d+), z=(-?\d+)>/)
            .slice(1)
            .map(Number),
        [0, 0, 0],
    ]);
}

function oneStep(moons) {
    for (let i = 0; i < moons.length; i++) {
        const [pos1, vel1] = moons[i];
        for (let j = 0; j < moons.length; j++) {
            if (i !== j) {
                const pos2 = moons[j][0];
                for (let k = 0; k < 3; k++) {
                    if (pos1[k] > pos2[k]) vel1[k]--;
                    if (pos1[k] < pos2[k]) vel1[k]++;
                }
            }
        }
    }
    for (let i = 0; i < moons.length; i++) {
        const [pos, vel] = moons[i];
        for (let k = 0; k < 3; k++) {
            pos[k] += vel[k];
        }
    }
}

const gcd = (a, b) => (a ? gcd(b % a, a) : b);
const lcm = (a, b) => (a * b) / gcd(a, b);

function cycle(moons) {
    const cycles = [0, 0, 0];
    const initial = [];
    for (let d = 0; d < 3; d++) {
        initial[d] = moons.map((m) => m[0][d]);
    }
    step = 1;
    do {
        oneStep(moons);
        step++;
        for (let d = 0; d < 3; d++) {
            if (
                cycles[d] === 0 &&
                moons[0][0][d] === initial[d][0] &&
                moons[1][0][d] === initial[d][1] &&
                moons[2][0][d] === initial[d][2] &&
                moons[3][0][d] === initial[d][3]
            ) {
                cycles[d] = step;
            }
        }
    } while (cycles[0] === 0 || cycles[1] === 0 || cycles[2] === 0);
    return cycles.reduce(lcm);
}

const moons = readMoons(input);

console.log(`Answer: ${cycle(moons)}`);
console.log(`Run time: ${Date.now() - start} ms`);
