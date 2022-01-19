let start = Date.now();

function run(reg) {
    const values = [];
    reg[2] = reg[1] | 65536;
    reg[1] = 7902108;
    while (true) {
        reg[5] = reg[2] % 256;
        reg[1] = ((reg[1] + reg[5]) * 65899) % 16777216;
        if (256 > reg[2]) {
            if (values.indexOf(reg[1]) > -1) return values[values.length - 1];
            values.push(reg[1]);
            reg[2] = reg[1] | 65536;
            reg[1] = 7902108;
        } else {
            reg[5] = Math.floor(reg[2] / 256);
            reg[2] = reg[5];
        }
    }
}

console.log(`Answer: ${run([1, 0, 0, 0, 0, 0])}`);
console.log(`Run time: ${Date.now() - start} ms`);
