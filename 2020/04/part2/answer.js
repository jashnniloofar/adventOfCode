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

function isValidYear(value, min, max) {
    return value.length === 4 && +value >= min && +value <= max;
}

function isValidHeight(value) {
    const unit = value.slice(-2);
    const height = +value.slice(0, -2);
    if (unit === "cm") return height >= 150 && height <= 193;
    if (unit === "in") return height >= 59 && height <= 76;
    return false;
}

function isValid(passport) {
    return (
        hasRequiredFields(passport) &&
        isValidYear(passport.byr, 1920, 2002) &&
        isValidYear(passport.iyr, 2010, 2020) &&
        isValidYear(passport.eyr, 2020, 2030) &&
        isValidHeight(passport.hgt) &&
        /^#[0-9a-f]{6}$/.test(passport.hcl) &&
        ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(passport.ecl) &&
        /^[0-9]{9}$/.test(passport.pid)
    );
}

console.log(`Answer: ${passports.reduce((count, pass) => (count += isValid(pass)), 0)}`);
console.timeEnd("Run time");
