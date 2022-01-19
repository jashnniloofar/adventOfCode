let start = Date.now();

function run(reg) {
    reg[4] = reg[4] + 2;
    reg[4] = reg[4] * reg[4];
    reg[4] = reg[4] * 19;
    reg[4] = reg[4] * 11;
    reg[1] = reg[1] + 4;
    reg[1] = reg[1] * 22;
    reg[1] = reg[1] + 2;
    reg[4] = reg[4] + reg[1];
    if (reg[0] === 1) {
        reg[1] = 27;
        reg[1] = reg[1] * 28;
        reg[1] = reg[1] + 29;
        reg[1] = reg[1] * 30;
        reg[1] = reg[1] * 14;
        reg[1] = reg[1] * 32;
        reg[4] = reg[4] + reg[1];
        reg[0] = 0;
    }
    reg[2] = 1;
    reg[5] = 1;
    for (let c = 0; c <= reg[4]; c++) {
        if (reg[4] % c === 0) reg[0] += c;
    }
    return reg;
}

console.log(`Answer: ${run([1, 0, 0, 0, 0, 0])[0]}`);
console.log(`Run time: ${Date.now() - start} ms`);
