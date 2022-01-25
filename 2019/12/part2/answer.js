const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();
const lines = input.split(/\r?\n/);

// function prime(count) {
//     const primes = [2];
//     for (let i = 3; i < count; i = i + 2) {
//         let isPrime = true;
//         for (const prime of primes) {
//             if (prime * prime > i) continue;
//             if (i % prime === 0) {
//                 isPrime = false;
//                 continue;
//             }
//         }
//         if (isPrime) primes.push(i);
//     }
//     return primes;
// }
// let number = 4686774924;
// const primes = prime(5000);
// for (let i = 0; i < primes.length; i++) {
//     while (number % primes[i] === 0) {
//         number = number / primes[i];
//         console.log(primes[i], number);
//     }
// }

// console.log(prime(1000));

console.log(`Answer: ${lines.length}`);
console.log(`Run time: ${Date.now() - start} ms`);
