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

console.log(`Answer: ${run().accumulator}`);
console.timeEnd("Run time");
