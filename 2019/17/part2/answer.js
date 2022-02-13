const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();

function readInput(input) {
    return input.split(",").map(Number);
}

const directions = [([x, y]) => [x, y - 1], ([x, y]) => [x - 1, y], ([x, y]) => [x, y + 1], ([x, y]) => [x + 1, y]];

function getParam(memory, mode, position, relativeBase) {
    const pos = mode === 0 ? memory[position] : mode === 1 ? position : memory[position] + relativeBase;
    return { pos, value: memory[pos] || 0 };
}

function RunIntcode(memory, inputs) {
    let ip = 0;
    let outputs = [];
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
                const asci = inputs.shift();
                memory[param1.pos] = asci;
                ip += 2;
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

function getMap(outputs) {
    const map = [[]];
    const robot = { pos: [], dir: -1 };
    let y = 0;
    let x = 0;
    for (let i = 0; i < outputs.length; i++) {
        const ch = String.fromCharCode(outputs[i]);
        if (ch === "\n") {
            y++;
            x = 0;
            map[y] = [];
        } else {
            map[y][x] = ch;
            if (["^", "<", ">", "v"].includes(map[y][x])) {
                robot.pos = [x, y];
                if (map[y][x] === "^") robot.dir = 0;
                if (map[y][x] === "<") robot.dir = 1;
                if (map[y][x] === "v") robot.dir = 2;
                if (map[y][x] === ">") robot.dir = 3;
            }
            x++;
        }
    }
    return { map, robot };
}

function findPath(map, robot) {
    let move = 0;
    const path = [];
    while (true) {
        const [xF, yF] = directions[robot.dir](robot.pos);
        if (map[yF] && map[yF][xF] === "#") {
            robot.pos = [xF, yF];
            move++;
        } else {
            const [xR, yR] = directions[(robot.dir + 3) % 4](robot.pos);
            const [xL, yL] = directions[(robot.dir + 1) % 4](robot.pos);
            path.push(move);
            move = 1;
            if (map[yL] && map[yL][xL] === "#") {
                path.push("L");
                robot.pos = [xL, yL];
                robot.dir = (robot.dir + 1) % 4;
            } else if (map[yR] && map[yR][xR] === "#") {
                path.push("R");
                robot.pos = [xR, yR];
                robot.dir = (robot.dir + 3) % 4;
            } else {
                return path.slice(1).join(",");
            }
        }
    }
}

function strToAsci(str) {
    return str.split("").map((c) => c.charCodeAt(0));
}

function getInputs(path) {
    let [A, B, C] = `${path},`.match(/^(.{1,20})\1*(.{1,20})(?:\1|\2)*(.{1,20})(?:\1|\2|\3)*$/).slice(1);
    A = A.slice(0, A.length - 1);
    B = B.slice(0, B.length - 1);
    C = C.slice(0, C.length - 1);
    const routine = path.replace(new RegExp(A, "g"), "A").replace(new RegExp(B, "g"), "B").replace(new RegExp(C, "g"), "C");
    let inputs = [];
    inputs = inputs.concat(strToAsci(routine));
    inputs.push(10);
    inputs = inputs.concat(strToAsci(A));
    inputs.push(10);
    inputs = inputs.concat(strToAsci(B));
    inputs.push(10);
    inputs = inputs.concat(strToAsci(C));
    inputs.push(10);
    inputs.push("n".charCodeAt(0));
    inputs.push(10);
    return inputs;
}

let memory = readInput(input);
const { map, robot } = getMap(RunIntcode(memory));
const path = findPath(map, robot);
const inputs = getInputs(path);

memory = readInput(input);
memory[0] = 2;
const out = RunIntcode(memory, inputs);

console.log(`Answer: ${out.pop()}`);
console.log(`Run time: ${Date.now() - start} ms`);
