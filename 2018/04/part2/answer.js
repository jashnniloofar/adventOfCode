const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();
const records = input
    .split(/\r?\n/)
    .sort()
    .map((line) => line.substr(1).split("] "));

let currentGurad;
let sleepFrom;
let sleepTo;
const guards = {};
records.forEach((record) => {
    const [time, event] = record;
    if (event.startsWith("Guard")) {
        currentGurad = parseInt(event.match(/[0-9]+/));
    }
    if (event.startsWith("falls asleep")) {
        sleepFrom = parseInt(time.substr(14));
    }
    if (event.startsWith("wakes up")) {
        sleepTo = parseInt(time.substr(14));
        if (guards[currentGurad] === undefined) guards[currentGurad] = { sleepMinutes: [], sum: 0 };
        for (let i = sleepFrom; i < sleepTo; i++) {
            guards[currentGurad].sleepMinutes[i] = (guards[currentGurad].sleepMinutes[i] || 0) + 1;
        }
        guards[currentGurad].sum += sleepTo - sleepFrom;
    }
});

function most(minutes) {
    let max = 0;
    let index;
    for (let i = 0; i < 60; i++) {
        if (minutes[i] > max) {
            max = minutes[i];
            index = i;
        }
    }
    return [index, max];
}

let max = 0;
let result;
for (const [guard, { sleepMinutes, sum }] of Object.entries(guards)) {
    const [minute, times] = most(sleepMinutes);
    if (times > max) {
        result = guard * minute;
        max = times;
    }
}

console.log(`Answer: ${result}`);
console.log(`Run time: ${Date.now() - start} ms`);
