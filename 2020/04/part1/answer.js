console.time("Run time");
const fs = require("fs");
const input = fs.readFileSync("./input.txt").toString();

const passports = [];
let passport = {};
input.split(/\r?\n/).forEach((line) => {
    if (line.length > 0) {
        line.split(" ").forEach((item) => {
            const [k, v] = item.split(":");
            passport[k] = v;
        });
    } else {
        passports.push(passport);
        passport = {};
    }
});

function hasRequiredFields(passport) {
    const keys = Object.keys(passport);
    return keys.length === 8 || (keys.length === 7 && passport.cid === undefined);
}

console.log(`Answer: ${passports.reduce((count, pass) => (count += hasRequiredFields(pass)), 0)}`);
console.timeEnd("Run time");
