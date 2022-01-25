const fs = require("fs");
let start = Date.now();
const memory = fs.readFileSync("./input.txt").toString().split(",").map(Number);

function RunIntcode(memory, input) {
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
                memory[memory[index + 1]] = input;
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

console.log(`Answer: ${RunIntcode(memory, 5)}`);
console.log(`Run time: ${Date.now() - start} ms`);
