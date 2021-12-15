const fs = require("fs");

const input = fs.readFileSync("./input.txt").toString();
const lines = input.split(/\r?\n/);

let polymer = lines[0];
const insertionRules = new Map();

for (let index = 2; index < lines.length; index++) {
    const parts = lines[index].split(" -> ");
    insertionRules.set(parts[0], [`${parts[0][0]}${parts[1]}`, `${parts[1]}${parts[0][1]}`]);
}

const lastChar = polymer[polymer.length - 1];

function increaseMap(map, key, count = 1) {
    map.set(key, count + (map.has(key) ? map.get(key) : 0));
}

function buildPolymer(polymer, insertionRules, stepCount) {
    let map = new Map();
    for (let i = 0; i < polymer.length - 1; i++) {
        increaseMap(map, `${polymer[i]}${polymer[i + 1]}`, 1);
    }

    for (let step = 0; step < stepCount; step++) {
        let current = new Map();
        map.forEach((count, pair) => {
            const nextStep = insertionRules.get(pair);
            increaseMap(current, nextStep[0], count);
            increaseMap(current, nextStep[1], count);
        });
        map = current;
    }

    const elements = new Map();
    increaseMap(elements, lastChar);
    map.forEach((count, pair) => {
        increaseMap(elements, pair[0], count);
    });

    const values = [...elements.values()];
    const min = Math.min(...values);
    const max = Math.max(...values);
    return { min, max };
}

const { min, max } = buildPolymer(polymer, insertionRules, 10);

console.log(`Answer: ${max - min}`);