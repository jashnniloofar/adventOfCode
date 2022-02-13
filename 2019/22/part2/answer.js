const fs = require("fs");
console.time("Run time");
const input = fs.readFileSync("./input.txt").toString();
const steps = input.split(/\r?\n/);
const deckSize = 119315717514047n;
const repeats = 101741582076661n;

function shuffle(steps) {
    let offset = 0n;
    let increment = 1n;
    for (const step of steps) {
        if (step === "deal into new stack") {
            increment = -increment % deckSize;
            offset = (increment + offset) % deckSize;
        } else if (step.startsWith("cut")) {
            const val = BigInt(step.match(/\-?[\d]+/));
            offset = (offset + val * increment) % deckSize;
        } else {
            const val = BigInt(step.match(/\-?[\d]+/));
            increment = (increment * modInverse(val, deckSize)) % deckSize;
        }
    }
    const inc = powerMod(increment, repeats, deckSize);
    offset = (offset * (1n - inc) * modInverse((1n - increment) % deckSize, deckSize)) % deckSize;
    return (offset + inc * 2020n) % deckSize;
}

// calculates   base^exponent % modulus
function powerMod(base, exponent, modulus) {
    if (modulus === 1n) return 0;
    var result = 1n;
    base = base % modulus;
    while (exponent > 0n) {
        if (exponent % 2n === 1n)
        //odd number
        result = (result * base) % modulus;
        exponent = exponent >> 1n; //divide by 2
        base = (base * base) % modulus;
    }
    return result;
}

function modInverse(a, m) {
    a = ((a % m) + m) % m;
    if (!a || m < 2n) {
        return NaN; // invalid input
    }
    // find the gcd
    const s = [];
    let b = m;
    while (b) {
        [a, b] = [b, a % b];
        s.push({ a, b });
    }
    if (a !== 1n) {
        return NaN; // inverse does not exists
    }
    // find the inverse
    let x = 1n;
    let y = 0n;
    for (let i = s.length - 2; i >= 0; --i) {
        [x, y] = [y, x - y * (s[i].a / s[i].b)];
    }
    return ((y % m) + m) % m;
}

console.log(`Answer: ${shuffle(steps)}`);
console.timeEnd("Run time");
