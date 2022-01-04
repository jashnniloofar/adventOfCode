const fs = require("fs");
let start = Date.now();
const input = parseInt(fs.readFileSync("./input.txt").toString());


// if number is power of 3 then return number like: 100000 --> 100000
// if right digit in radix 3 is 1 then return remains like: 10010 --> 0010
// if right digit in radix 3 is 2 then nearest pow(3) + 2 * remain to 3 like: 2000101 --> 1000000 + 2 * 000101 
function solve(count) {
    const radix3 = count.toString(3);
    const remain = parseInt(radix3.substr(1), 3);
    if (radix3[0] === "1") {
        if (remain === 0) return count;
        return remain;
    }

    return 3 ** (radix3.length - 1) + 2 * remain;
}

console.log(`Answer: ${solve(input)}`);
console.log(`Run time: ${Date.now() - start} ms`);
