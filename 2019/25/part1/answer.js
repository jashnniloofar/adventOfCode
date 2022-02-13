const fs = require("fs");
var logStream = fs.createWriteStream("log.txt", { flags: "w" });
const input = fs.readFileSync("./input.txt").toString();

function readMemory(input) {
    return input.split(",").map(Number);
}

function getParam(memory, mode, position, relativeBase) {
    const pos = mode === 0 ? memory[position] : mode === 1 ? position : memory[position] + relativeBase;
    return { pos, value: memory[pos] || 0 };
}

function getOut(outputs) {
    const str = outputs.map((code) => String.fromCharCode(code)).join("");
    if (/== ([A-Za-z ]+) ==/.test(str)) {
        const out = { options: [], item: "", name: str.match(/== ([A-Za-z ]+) ==/)[1] };
        if (/- north/.test(str)) out.options.push("north");
        if (/- south/.test(str)) out.options.push("south");
        if (/- west/.test(str)) out.options.push("west");
        if (/- east/.test(str)) out.options.push("east");
        if (/Items here:/.test(str)) out.item = str.match(/Items here:\n- ([a-z ]+)/)[1];
        return out;
    }
    return null;
}

function getInv(outputs) {
    let str = outputs.map((code) => String.fromCharCode(code)).join("");
    str = str.substring(str.match(/Items in your inventory:/).index);
    return str.match(/- [a-z ]+/g).map((s) => s.slice(2));
}

function getPassowrd(outputs) {
    let str = outputs.map((code) => String.fromCharCode(code)).join("");
    if (/Analysis complete/.test(str)) {
        return str.match(/[\d]+/)[0];
    }
    return null;
}

function getCommand(str) {
    return str
        .split("")
        .map((s) => s.charCodeAt(0))
        .concat(10);
}

function getPerm(num) {
    const binary = num.toString(2).padStart(8, 0);
    let perm = [];
    for (let i = 0; i < 8; i++) {
        if (binary[i] === "1") perm.push(i);
    }
    return perm;
}
const opposite = { north: "south", south: "north", west: "east", east: "west" };

function RunIntcode(memory, inputs = [], outputs = [], options) {
    let ip = 0;
    let relativeBase = 0;
    let current = "";
    let allItems = [];
    let testNum = 0;
    let phase = "navigation";
    const map = new Map();
    const returnPath = [];
    const path = [];
    let lastCommand;
    let pressureRoomDirection;
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
                    if (phase === "navigation") {
                        const status = getOut(outputs);
                        if (status !== null) {
                            status.parent = current;
                            current = status.name;
                            status.path = path.slice(0);
                            status.visited = [];
                        } else {
                            pressureRoomDirection = opposite[lastCommand];
                        }
                        if (!map.has(current)) map.set(current, status);

                        const room = map.get(current);
                        let command = "";
                        if (
                            room.item !== "" &&
                            !["giant electromagnet", "photons", "molten lava", "infinite loop", "escape pod"].includes(status.item)
                        ) {
                            inputs = inputs.concat(getCommand(`take ${status.item}`));
                        }
                        room.options.forEach((option) => {
                            if (!room.visited.includes(option)) command = option;
                        });
                        if (command != "") {
                            returnPath.push(opposite[command]);
                            path.push(command);
                            room.visited.push(command);
                        } else {
                            if (returnPath.length === 0) {
                                map.get("Security Checkpoint").path.forEach((command) => {
                                    inputs = inputs.concat(getCommand(command));
                                });
                                inputs = inputs.concat(getCommand("inv"));
                                phase = "drop";
                            } else {
                                command = returnPath.pop();
                                path.pop();
                            }
                        }
                        if (command != "") {
                            lastCommand = command;
                            inputs = inputs.concat(getCommand(command));
                        }
                    } else if (phase === "drop") {
                        allItems = getInv(outputs);
                        allItems.forEach((item) => {
                            inputs = inputs.concat(getCommand(`drop ${item}`));
                        });
                        phase = "test";
                    } else if (phase === "test") {
                        const perm = getPerm(testNum);
                        perm.forEach((i) => {
                            inputs = inputs.concat(getCommand(`take ${allItems[i]}`));
                        });
                        inputs = inputs.concat(getCommand("inv"));

                        inputs = inputs.concat(getCommand(pressureRoomDirection));

                        perm.forEach((i) => {
                            inputs = inputs.concat(getCommand(`drop ${allItems[i]}`));
                        });
                        testNum++;
                    }
                    outputs = [];
                }
                break;
            case 4:
                logStream.write(String.fromCharCode(param1.value));
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
    return getPassowrd(outputs);
}

console.time("Run time");
const password = RunIntcode(readMemory(input), [], [], {});
console.log(`Answer: ${password}`);
console.timeEnd("Run time");
logStream.end();
