const fs = require("fs");

const input = fs.readFileSync("./input.txt").toString();
const lines = input.split(/\r?\n/);

function removeGuess(guesses, char, exceptoins) {
    for (const key in guesses) {
        if (Object.hasOwnProperty.call(guesses, key)) {
            if (!exceptoins.find((exceptoin) => exceptoin === key)) {
                guesses[key] = guesses[key].replace(new RegExp(char, "i"), "");
            }
        }
    }
}

function decryptOutput(encrypted, keys) {
    let decrypted = "";
    for (let index = 0; index < encrypted.length; index++) {
        decrypted = decrypted + keys[encrypted[index]];
    }
    decrypted = decrypted
        .split("")
        .sort((a, b) => a.localeCompare(b))
        .join("");
    switch (decrypted) {
        case "abcefg":
            return "0";
        case "cf":
            return "1";
        case "acdeg":
            return "2";
        case "acdfg":
            return "3";
        case "bcdf":
            return "4";
        case "abdfg":
            return "5";
        case "abdefg":
            return "6";
        case "acf":
            return "7";
        case "abcdefg":
            return "8";
        case "abcdfg":
            return "9";
    }
}
let sum = 0;
lines.forEach((line) => {
    const inputs = line.split(" | ")[0].split(" ");
    let charCounts = { a: 0, b: 0, c: 0, d: 0, e: 0, f: 0, g: 0 };
    let one,
        four,
        seven = "";
    inputs.forEach((input) => {
        for (let index = 0; index < input.length; index++) {
            charCounts[input.charAt(index)]++;
        }
        if (input.length === 2) one = input;
        if (input.length === 3) seven = input;
        if (input.length === 4) four = input;
    });
    let guesses = { a: "abcdefg", b: "abcdefg", c: "abcdefg", d: "abcdefg", e: "abcdefg", f: "abcdefg", g: "abcdefg" };
    for (const key in charCounts) {
        if (Object.hasOwnProperty.call(charCounts, key)) {
            if (charCounts[key] === 4) {
                guesses.e = key;
                removeGuess(guesses, key, ["e"]);
            }
            if (charCounts[key] === 9) {
                guesses.f = key;
                removeGuess(guesses, key, ["f"]);
            }
            if (charCounts[key] === 6) {
                guesses.b = key;
                removeGuess(guesses, key, ["b"]);
            }
        }
    }

    const c = one.replace(new RegExp(guesses.f, "i"), "");
    guesses.c = c;
    removeGuess(guesses, c, ["c"]);
    const a = seven.replace(new RegExp(guesses.c, "i"), "").replace(new RegExp(guesses.f, "i"), "");
    guesses.a = a;
    removeGuess(guesses, a, ["a"]);
    const d = four.replace(new RegExp(guesses.b, "i"), "").replace(new RegExp(guesses.c, "i"), "").replace(new RegExp(guesses.f, "i"), "");
    guesses.d = d;
    removeGuess(guesses, d, ["d"]);
    let keys = { a: "", b: "", c: "", d: "", e: "", f: "", g: "" };
    for (const key in guesses) {
        if (Object.hasOwnProperty.call(guesses, key)) {
            keys[guesses[key]] = key;
        }
    }
    let decrypted = "";
    const outputs = line.split(" | ")[1].split(" ");
    outputs.forEach((output) => {
        decrypted += decryptOutput(output, keys);
    });
    sum += parseInt(decrypted);
});

console.log(`Answer: ${sum}`);
