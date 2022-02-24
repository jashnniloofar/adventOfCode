console.time("Run time");
const fs = require("fs");
const input = fs.readFileSync("./input.txt").toString();
const [cardKey, doorKey] = input.split(/\r?\n/).map(Number);

function findLoopSize(subject, target) {
    let result = 1;
    let loopSize = 0;
    while (result !== target) {
        loopSize++;
        result = (result * subject) % 20201227;
    }
    return loopSize;
}

function transform(subject, loopSize) {
    let result = 1;
    for (let i = 0; i < loopSize; i++) {
        result = (result * subject) % 20201227;
    }
    return result;
}

const encryptionKey = transform(doorKey, findLoopSize(7, cardKey));
console.log(`Answer: ${encryptionKey}`);
console.timeEnd("Run time");
