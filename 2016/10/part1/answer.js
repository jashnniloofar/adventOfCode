const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();
const bots = [];
const instructions = [];

let startId = -1;
input.split(/\r?\n/).forEach((line) => {
    if (line.startsWith("value ")) {
        const [value, bot] = line.match(/[0-9]+/g).map((s) => parseInt(s));
        bots[bot] = bots[bot] ? [...bots[bot], value] : [value];
        if (bots[bot].length === 2) startId = bot;
    } else {
        const [bot, ...instruction] = line.match(/([0-9]+).*(bot|output) ([0-9]+).* (bot|output) ([0-9]+)/).splice(1);
        instructions[parseInt(bot)] = instruction;
    }
});

let botId = -1;
function work(bot) {
    if (botId !== -1) return;
    const values = bots[bot];
    const instruction = instructions[bot];
    const [low, high] = values[0] < values[1] ? values : [values[1], values[0]];
    if (low === 17 && high === 61) botId = bot;

    if (instruction[0] === "bot") {
        const id = parseInt(instruction[1]);
        bots[id] = bots[id] ? [...bots[id], low] : [low];
        if (bots[id].length === 2) work(id);
    }
    if (instruction[2] === "bot") {
        const id = parseInt(instruction[3]);
        bots[id] = bots[id] ? [...bots[id], high] : [high];
        if (bots[id].length === 2) work(id);
    }
}
work(startId);

console.log(`Answer: ${botId}`);
console.log(`Run time: ${Date.now() - start} ms`);
