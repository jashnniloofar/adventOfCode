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

function RunIntcode(memory, inputs) {
    let index = 0;
    let out = 0;
    while (memory[index] !== 99) {
        const opcode = memory[index] % 100;
        const mode1 = Math.floor(memory[index] / 100) % 10;
        const mode2 = Math.floor(memory[index] / 1000) % 10;
        const param1 = mode1 === 0 ? memory[memory[index + 1]] : memory[index + 1];
        const param2 = mode2 === 0 ? memory[memory[index + 2]] : memory[index + 2];
        switch (opcode) {
            case 1:
                memory[memory[index + 3]] = param1 + param2;
                index += 4;
                break;
            case 2:
                memory[memory[index + 3]] = param1 * param2;
                index += 4;
                break;
            case 3:
                memory[memory[index + 1]] = inputs.shift();
                index += 2;
                break;
            case 4:
                out = param1;
                index += 2;
                break;
            case 5:
                index = param1 !== 0 ? param2 : index + 3;
                break;
            case 6:
                index = param1 === 0 ? param2 : index + 3;
                break;
            case 7:
                memory[memory[index + 3]] = param1 < param2 ? 1 : 0;
                index += 4;
                break;
            case 8:
                memory[memory[index + 3]] = param1 === param2 ? 1 : 0;
                index += 4;
                break;
            default:
                break;
        }
    }
    return out;
}

let max = 0;

permutator([0, 1, 2, 3, 4]).forEach((signals) => {
    let out = 0;
    signals.forEach((signal) => {
        out = RunIntcode(memory.slice(0), [signal, out]);
    });
    if (out > max) max = out;
});

console.log(`Answer: ${max}`);
console.log(`Run time: ${Date.now() - start} ms`);
