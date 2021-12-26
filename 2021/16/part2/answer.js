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
    const type = parseInt(binary.substring(3, 6), 2);
    let value = 0;
    let length = 0;
    if (type === 4) {
        let lastGroup = false;
        let index = 6;
        do {
            const group = binary.substring(index, index + 5);
            value = value * 16 + parseInt(group.substring(1), 2);
            index += 5;
            lastGroup = group[0] === "0";
        } while (!lastGroup);
        length = index;
    } else {
        const subPackets = [];
        if (binary[6] === "0") {
            const subPacketsLength = parseInt(binary.substring(7, 22), 2);
            let index = 0;
            while (index < subPacketsLength) {
                const { value, length } = parsePacket(binary.substring(22 + index));
                subPackets.push(value);
                index += length;
            }
            length = 22 + subPacketsLength;
        } else {
            const subPacketsCount = parseInt(binary.substring(7, 18), 2);
            let index = 0;
            for (let i = 0; i < subPacketsCount; i++) {
                const { value, length } = parsePacket(binary.substring(18 + index));
                subPackets.push(value);
                index += length;
            }
            length = 18 + index;
        }

        switch (type) {
            case 0:
                for (const packet of subPackets) {
                    value += packet;
                }
                break;
            case 1:
                value = 1;
                for (const packet of subPackets) {
                    value *= packet;
                }
                break;
            case 2:
                value = Math.min(...subPackets);
                break;
            case 3:
                value = Math.max(...subPackets);
                break;
            case 5:
                value = subPackets[0] > subPackets[1] ? 1 : 0;
                break;
            case 6:
                value = subPackets[0] < subPackets[1] ? 1 : 0;
                break;
            case 7:
                value = subPackets[0] == subPackets[1] ? 1 : 0;
                break;
            default:
                break;
        }
    }
    return { value, length };
}

console.log(`Answer: ${parsePacket(binary).value}`);
