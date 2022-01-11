const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();
const lines = input.split(/\r?\n/);

const startState = lines[0].match(/Begin in state ([A-Z])/)[1];
const steps = parseInt(lines[1].match(/([0-9]+)/)[1]);
const states = {};
for (let index = 3; index < lines.length; index += 10) {
    const [state, write0, dir0, next0, write1, dir1, next1] = lines
        .slice(index, index + 10)
        .join("")
        .match(/In state (.).* value (.).*the (left|right).* state (.).* value (.).*the (left|right).* state (.)/)
        .slice(1);
    states[state] = {
        0: { write: write0, dir: dir0 === "right" ? 1 : -1, next: next0 },
        1: { write: write1, dir: dir1 === "right" ? 1 : -1, next: next1 },
    };
}
const tape = [];
let currentState = startState;
let cursor = 10000;
for (let i = 0; i < steps; i++) {
    const next = tape[cursor] === "1" ? states[currentState]["1"] : states[currentState]["0"];
    tape[cursor] = next.write;
    currentState = next.next;
    cursor += next.dir;
}

console.log(`Answer: ${Object.values(tape).filter((a) => a === "1").length}`);
console.log(`Run time: ${Date.now() - start} ms`);
