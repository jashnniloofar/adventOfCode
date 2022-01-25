const fs = require("fs");
let start = Date.now();
const asteroids = [];
const input = fs.readFileSync("./input.txt").toString();
input.split(/\r?\n/).forEach((line, y) => {
    for (let x = 0; x < line.length; x++) {
        if (line[x] === "#") asteroids.push({ y, x });
    }
});

function dist(asteroid1, asteroid2) {
    return Math.abs(asteroid1.x - asteroid2.x) + Math.abs(asteroid1.y - asteroid2.y);
}

function maxDetected(asteroids) {
    let maxValue = 0;
    let maxIndex = 0;
    const angles = [];
    for (let i = 0; i < asteroids.length; i++) {
        angles[i] = new Map();
        for (let j = 0; j < asteroids.length; j++) {
            if (i !== j) {
                const angle = Math.atan2(asteroids[j].x - asteroids[i].x, asteroids[j].y - asteroids[i].y);
                if (angles[i].has(angle)) {
                    const k = angles[i].get(angle);
                    if (dist(asteroids[i], asteroids[j]) < dist(asteroids[i], asteroids[k])) {
                        angles[i].set(angle, j);
                    }
                } else {
                    angles[i].set(angle, j);
                }
            }
        }
        if (angles[i].size > maxValue) {
            maxValue = angles[i].size;
            maxIndex = i;
        }
    }

    return { maxIndex, maxValue, angles: angles[maxIndex] };
}

const targets = [...maxDetected(asteroids).angles.entries()].sort((a, b) => b[0] - a[0]);

console.log(`Answer: ${asteroids[targets[199][1]].x * 100 + asteroids[targets[199][1]].y}`);
console.log(`Run time: ${Date.now() - start} ms`);
