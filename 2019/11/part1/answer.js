const fs = require("fs");
let start = Date.now();
const memory = fs.readFileSync("./input.txt").toString().split(",").map(Number);

function getParam(memory, mode, position, relativeBase) {
    const pos = mode === 0 ? memory[position] : mode === 1 ? position : memory[position] + relativeBase;
    return { pos, value: memory[pos] || 0 };
}
const directions = [([x, y]) => [x, y - 1], ([x, y]) => [x - 1, y], ([x, y]) => [x, y + 1], ([x, y]) => [x + 1, y]];
const panel = new Map();
function getInput(robot) {
    const key = `${robot.x},${robot.y}`;
    if (panel.has(key)) return panel.get(key);
    else return 0;
}

function senOutput(robot, out) {
    const key = `${robot.x},${robot.y}`;
    panel.set(key, out[0]);
    if (out[1] === 0) robot.dir = (robot.dir + 1) % 4;
    else robot.dir = (robot.dir + 3) % 4;
    [robot.x, robot.y] = directions[robot.dir]([robot.x, robot.y]);
}

function RunIntcode(memory, robot) {
    let ip = 0;
    let out = [];
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
                memory[param1.pos] = getInput(robot);
                ip += 2;
                break;
            case 4:
                out.push(param1.value);
                if (out.length === 2) {
                    senOutput(robot, out);
                    out = [];
                }
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

const robot = { x: 0, y: 0, dir: 0 };
RunIntcode(memory, robot)

console.log(`Answer: ${panel.size}`);
console.log(`Run time: ${Date.now() - start} ms`);
