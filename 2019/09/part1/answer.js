const fs = require("fs");
let start = Date.now();
const memory = fs.readFileSync("./input.txt").toString().split(",").map(Number);

function getParam(memory, mode, position, relativeBase) {
    const pos = mode === 0 ? memory[position] : mode === 1 ? position : memory[position] + relativeBase;
    return { pos, value: memory[pos] || 0 };
}

function RunIntcode(memory, inputs) {
    let ip = 0;
    let out = 0;
    let relativeBase = 0;
    while (memory[ip] !== 99) {
        const opcode = memory[ip] % 100;
        const mode1 = Math.floor(memory[ip] / 100) % 10;
        const mode2 = Math.floor(memory[ip] / 1000) % 10;
        const mode3 = Math.floor(memory[ip] / 10000) % 10;
        const param1 = getParam(memory, mode1, ip + 1, relativeBase);
        const param2 = getParam(memory, mode2, ip + 2, relativeBase);
        const param3 = getParam(memory, mode3, ip + 3, relativeBase);
        switch (opcode) {
            case 1:
                memory[param3.pos] = param1.value + param2.value;
                ip += 4;
                break;
            case 2:
                memory[param3.pos] = param1.value * param2.value;
                ip += 4;
                break;
            case 3:
                memory[param1.pos] = inputs.shift();
                ip += 2;
                break;
            case 4:
                out = param1.value;
                ip += 2;
                break;
            case 5:
                ip = param1.value !== 0 ? param2.value : ip + 3;
                break;
            case 6:
                ip = param1.value === 0 ? param2.value : ip + 3;
                break;
            case 7:
                memory[param3.pos] = param1.value < param2.value ? 1 : 0;
                ip += 4;
                break;
            case 8:
                memory[param3.pos] = param1.value === param2.value ? 1 : 0;
                ip += 4;
                break;
            case 9:
                relativeBase += param1.value;
                ip += 2;
                break;
            default:
                break;
        }
    }
    return out;
}

console.log(`Answer: ${RunIntcode(memory, [1])}`);
console.log(`Run time: ${Date.now() - start} ms`);
