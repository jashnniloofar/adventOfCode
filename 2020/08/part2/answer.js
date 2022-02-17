console.time("Run time");
const fs = require("fs");
const input = fs.readFileSync("./input.txt").toString();
const instructions = input.split(/\r?\n/).map((instruction) => instruction.split(" "));

function run() {
    let accumulator = 0;
    let ip = 0;
    const visited = new Set();
    while (ip < instructions.length && !visited.has(ip)) {
        const [operation, argument] = instructions[ip];
        visited.add(ip);
        switch (operation) {
            case "acc":
                accumulator += +argument;
                ip++;
                break;
            case "jmp":
                ip += +argument;
                break;
            case "nop":
                ip++;
        }
    }
    return { ip, accumulator };
}

function fix() {
    for (let index = 0; index < instructions.length; index++) {
        if (instructions[index][0] === "acc") continue;
        let operation = instructions[index][0];

        if (operation === "nop") instructions[index][0] = "jmp";
        else instructions[index][0] = "nop";

        const { ip, accumulator } = run();
        if (ip === instructions.length) return accumulator;
        instructions[index][0] = operation;
    }
}

console.log(`Answer: ${fix()}`);
console.timeEnd("Run time");
