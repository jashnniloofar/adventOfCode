const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();
const steps = input
    .substring(6)
    .split(/\ninp w\r?\n/)
    .map((str) => str.split(/\r?\n/).map((str) => str.split(/ /)));

function calcStep(z, step, input) {
    let state = { x: 0, y: 0, z: z, w: input };
    for (const command of step) {
        const operand2 = ["w", "x", "y", "z"].includes(command[2]) ? state[command[2]] : parseInt(command[2]);
        switch (command[0]) {
            case "add":
                state[command[1]] = state[command[1]] + operand2;
                break;
            case "mul":
                state[command[1]] = state[command[1]] * operand2;
                break;
            case "eql":
                state[command[1]] = state[command[1]] === operand2 ? 1 : 0;
                break;
            case "div":
                if (operand2 === 0) console.log("error");
                state[command[1]] = Math.floor(state[command[1]] / operand2);
                break;
            case "mod":
                if (command[1] < 0 || operand2 < 0) console.log("error");
                state[command[1]] = state[command[1]] % operand2;
                break;
            default:
                break;
        }
    }
    return state.z;
}
function pushMap(map, key, values) {
    if (map.has(key)) map.set(key, map.get(key).concat(values));
    else map.set(key, values);
}

function nextStep(current, stateIndex) {
    let next = new Map();
    const xFactor = parseInt(steps[stateIndex][4][2]);
    current.forEach((values, key) => {
        for (let w = 1; w < 10; w++) {
            if (xFactor >= 0 || w === (key % 26) + xFactor) {
                const result = calcStep(key, steps[stateIndex], w);
                pushMap(
                    next,
                    result,
                    values.map((v) => v * 10 + w)
                );
            }
        }
    });
    return next;
}

let current = new Map();
current.set(0, [0]);
for (let index = 0; index < 14; index++) {
    current = nextStep(current, index);
}
let min = Number.MAX_VALUE;
for (const val of current.get(0)) {
    if (val < min) min = val;
}

console.log(`Answer: ${min}`);
console.log(`Run time: ${Date.now() - start} ms`);