let start = Date.now();
function solve(a) {
    for (let b = a - 1; b > 1; b--) {
        a *= b;
    }
    return a + 82 * 73;
}

console.log(`Answer: ${solve(12)}`);
console.log(`Run time: ${Date.now() - start} ms`);
