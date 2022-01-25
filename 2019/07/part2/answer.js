const fs = require("fs");
let start = Date.now();
const memory = fs.readFileSync("./input.txt").toString().split(",").map(Number);

const permutator = (inputArr) => {
    const result = [];
    const permute = (arr, m = []) => {
        if (arr.length === 0) {
            result.push(m);
        } else {
            for (let i = 0; i < arr.length; i++) {
                const curr = arr.slice();
                const next = curr.splice(i, 1);
                permute(curr.slice(), m.concat(next));
            }
        }
    };
    permute(inputArr);
    return result;
};

function RunIntcode(amplifier) {
    let mem = amplifier.memory;
    while (mem[amplifier.ip] !== 99) {
        const opcode = mem[amplifier.ip] % 100;
        const mode1 = Math.floor(mem[amplifier.ip] / 100) % 10;
        const mode2 = Math.floor(mem[amplifier.ip] / 1000) % 10;
        const param1 = mode1 === 0 ? mem[mem[amplifier.ip + 1]] : mem[amplifier.ip + 1];
        const param2 = mode2 === 0 ? mem[mem[amplifier.ip + 2]] : mem[amplifier.ip + 2];
        switch (opcode) {
            case 1:
                mem[mem[amplifier.ip + 3]] = param1 + param2;
                amplifier.ip += 4;
                break;
            case 2:
                mem[mem[amplifier.ip + 3]] = param1 * param2;
                amplifier.ip += 4;
                break;
            case 3:
                mem[mem[amplifier.ip + 1]] = amplifier.inputs.shift();
                amplifier.ip += 2;
                break;
            case 4:
                amplifier.out = param1;
                amplifier.ip += 2;
                return param1;
            case 5:
                amplifier.ip = param1 !== 0 ? param2 : amplifier.ip + 3;
                break;
            case 6:
                amplifier.ip = param1 === 0 ? param2 : amplifier.ip + 3;
                break;
            case 7:
                mem[mem[amplifier.ip + 3]] = param1 < param2 ? 1 : 0;
                amplifier.ip += 4;
                break;
            case 8:
                mem[mem[amplifier.ip + 3]] = param1 === param2 ? 1 : 0;
                amplifier.ip += 4;
                break;
            default:
                break;
        }
    }
    return null;
}

let max = 0;

permutator([5, 6, 7, 8, 9]).forEach((signals) => {
    const amplifiers = [];
    for (let i = 0; i < 5; i++) {
        amplifiers.push({ memory: memory.slice(), ip: 0, inputs: [signals[i]], out: 0, halted: false });
    }
    let out = 0;
    while (!amplifiers[4].halted) {
        for (let i = 0; i < 5; i++) {
            if (out !== null) amplifiers[i].inputs.push(out);
            out = RunIntcode(amplifiers[i]);
            if (out == null) amplifiers[i].halted = true;
        }
    }
    if (amplifiers[4].out > max) max = amplifiers[4].out;
});

console.log(`Answer: ${max}`);
console.log(`Run time: ${Date.now() - start} ms`);
