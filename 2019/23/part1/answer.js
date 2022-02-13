const fs = require("fs");
const inputCode = fs.readFileSync("./input.txt").toString();

function readInput(input) {
    return input.split(",").map(Number);
}

function getParam(memory, mode, position, relativeBase) {
    const pos = mode === 0 ? memory[position] : mode === 1 ? position : memory[position] + relativeBase;
    return { pos, value: memory[pos] || 0 };
}

const unblock = () => new Promise(setImmediate);

async function RunIntcode(memory, inputs = [], outputs = [], options) {
    let ip = 0;
    let relativeBase = 0;
    while (memory[ip] !== 99 && !options.halt) {
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
                if (inputs.length > 0) {
                    memory[param1.pos] = inputs.shift();
                    ip += 2;
                } else {
                    await unblock();
                }
                break;
            case 4:
                outputs.push(param1.value);
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
    return outputs;
}

async function solve() {
    const inputs = [];
    const outputs = [];
    const options = [];
    for (let i = 0; i < 50; i++) {
        inputs[i] = [i];
        outputs[i] = [];
        options[i] = { halt: false };
    }

    inputs.forEach((input, i) => RunIntcode(readInput(inputCode), input, outputs[i], options[i]));

    while (true) {
        await unblock();
        for (const output of outputs) {
            const len = output.length;
            for (let i = 0; i < len; i = i + 3) {
                const address = output.shift();
                const x = output.shift();
                const y = output.shift();
                if (address === 255) {
                    for (let i = 0; i < 50; i++) options[i].halt = true;
                    return [x, y];
                }
                inputs[address].push(x);
                inputs[address].push(y);
            }
        }
        inputs.forEach((input) => input.length === 0 && input.push(-1));
    }
}

async function main() {
    console.time("Run time");
    const result = await solve()
    console.log(`Answer: ${result[1]}`);
    console.timeEnd("Run time");
}
main();
