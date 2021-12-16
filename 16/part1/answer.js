const fs = require("fs");

const input = fs.readFileSync("./input.txt").toString();

let binary = "";
function pad(num, size) {
    var s = "000000000" + num;
    return s.substr(s.length - size);
}
for (let i = 0; i < input.length; i++) {
    binary = binary + pad(parseInt(input[i], 16).toString(2), 4);
}
function parsePacket(binary) {
    let versionSum = parseInt(binary.substring(0, 3), 2);
    const type = parseInt(binary.substring(3, 6), 2);
    let length = 0;
    if (type === 4) {
        let lastGroup = false;
        let index = 6;
        let value = "";
        do {
            const group = binary.substring(index, index + 5);
            value += group.substring(1);
            index += 5;
            lastGroup = group[0] === "0";
        } while (!lastGroup);
        length = index;
    } else {
        if (binary[6] === "0") {
            const subPacketsLength = parseInt(binary.substring(7, 22), 2);
            let index = 0;
            while (index < subPacketsLength) {
                const { version, length } = parsePacket(binary.substring(22 + index));
                versionSum += version;
                index += length;
            }
            length = 22 + subPacketsLength;
        } else {
            const subPacketsCount = parseInt(binary.substring(7, 18), 2);

            let index = 0;
            for (let i = 0; i < subPacketsCount; i++) {
                const { version, length } = parsePacket(binary.substring(18 + index));
                versionSum += version;
                index += length;
            }
            length = 18 + index;
        }
    }
    return { version: versionSum, type, length };
}

console.log(`Answer: ${parsePacket(binary).version}`);
