const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();
const instructions = input.split(/\r?\n/).map((line) => line.split(" "));

const state = { a: 1, b: 0, c: 0, d: 0, e: 0, f: 0, g: 0, h: 0 };

function prime(count) {
    const primes = [];
    for (let i = 3; i < count; i = i + 2) {
        let isPrime = true;
        for (const prime of primes) {
            if (prime * prime > i) continue;
            if (i % prime === 0) {
                isPrime = false;
                continue;
            }
        }
        if (isPrime) primes.push(i);
    }
    return primes;
}
const primes = prime(108400 + 17000).filter((a) => a > 108400);

let h = 0;
for (let i = 108400; i <= 108400 + 17000; i = i + 17) {
    if (!primes.includes(i)) h++;
}

console.log(`Answer: ${h}`);
console.log(`Run time: ${Date.now() - start} ms`);
