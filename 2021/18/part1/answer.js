const fs = require("fs");

const input = fs.readFileSync("./input.txt").toString();
const snailfishes = input.split(/\r?\n/);

function add(snailfish1, snailfish2) {
    let current = `[${snailfish1},${snailfish2}]`;
    let before = "";
    while (before.localeCompare(current) !== 0) {
        before = current;
        current = explode(current);
        if (before.localeCompare(current) === 0) {
            current = split(current);
        }
    }
    return current;
}

function split(snailfish) {
    const parts = snailfish.match(/(\]|\[|\,|[0-9]+)/g);
    let splitIndex = -1;
    let i = 0;
    while (splitIndex < 0 && i < parts.length) {
        if (parts[i].search(/[0-9]+/) !== -1 && parts[i].length > 1) {
            splitIndex = i;
        }
        i++;
    }
    if (splitIndex > 0) {
        parts[splitIndex] = `[${Math.floor(parseInt(parts[splitIndex]) / 2)},${Math.ceil(parseInt(parts[splitIndex]) / 2)}]`;
        return parts.join("");
    } else {
        return snailfish;
    }
}

function explode(snailfish) {
    let nestedLevel = 0;
    let rightIndex = -1;
    const parts = snailfish.match(/(\]|\[|\,|[0-9]+)/g);
    let i = 0;
    while (nestedLevel < 5 && i < parts.length) {
        if (parts[i] === "[") nestedLevel++;
        else if (parts[i] === "]") nestedLevel--;
        else if (parts[i] !== ",") rightIndex = i;
        i++;
    }
    if (nestedLevel === 5) {
        const index = i - 1;
        i = i + 4;
        let leftIndex = -1;
        while (leftIndex === -1 && i < parts.length) {
            if (parts[i].search(/[0-9]+/) !== -1) leftIndex = i;
            i++;
        }
        if (rightIndex > 0) {
            parts[rightIndex] = `${parseInt(parts[index + 1]) + parseInt(parts[rightIndex])}`;
        }
        if (leftIndex > 0) {
            parts[leftIndex] = `${parseInt(parts[index + 3]) + parseInt(parts[leftIndex])}`;
        }
        parts[index] = "0";
        parts[index + 1] = "";
        parts[index + 2] = "";
        parts[index + 3] = "";
        parts[index + 4] = "";
        return parts.join("");
    } else {
        return snailfish;
    }
}
function value(snailfish) {
    if (snailfish.length === 1) {
        return parseInt(snailfish);
    }
    let nestedLevel = 0;
    let index = 0;
    while (nestedLevel !== 1 || snailfish[index] !== ",") {
        if (snailfish[index] === "[") nestedLevel++;
        if (snailfish[index] === "]") nestedLevel--;
        index++;
    }
    return 3 * value(snailfish.substring(1, index)) + 2 * value(snailfish.substring(index + 1, snailfish.length - 1));
}

let sum = snailfishes[0];
for (let index = 1; index < snailfishes.length; index++) {
    sum = add(sum, snailfishes[index]);
}

console.log(`Answer: ${value(sum)}`);
