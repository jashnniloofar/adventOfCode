const fs = require("fs");
let start = Date.now();
const input = fs.readFileSync("./input.txt").toString();
function readGroups() {
    let groups = [];
    let team = "immune";
    let id = 0;
    input.split(/\r?\n/).forEach((line) => {
        if (line.startsWith("Infection")) team = "infection";
        else if (/units each with/.test(line)) {
            id++;
            const [units, hp, attack, attackType, initiative] = line
                .match(/(\d+) units each with (\d+) hit points[a-z \(,;\)]* with an attack that does (\d+) ([a-z]+) damage at initiative (\d+)/)
                .slice(1);
            const immunities = /immune to ([a-z ,]+)[;\)]/.test(line) ? line.match(/immune to ([a-z ,]+)[;\)]/)[1].split(", ") : [];
            const weaknesses = /weak to ([a-z ,]+)[;\)]/.test(line) ? line.match(/weak to ([a-z ,]+)[;\)]/)[1].split(", ") : [];
            groups.push({ id, team, units: +units, hp: +hp, attack: +attack, attackType, initiative: +initiative, immunities, weaknesses });
        }
    });
    return groups;
}

function sortSelection(groups) {
    return groups.sort((g1, g2) => {
        const effPowerDiff = g2.units * g2.attack - g1.units * g1.attack;
        if (effPowerDiff === 0) {
            return g2.initiative - g1.initiative;
        }
        return effPowerDiff;
    });
}

function calcDamage(attacker, defender) {
    if (defender.immunities.includes(attacker.attackType)) return 0;
    if (defender.weaknesses.includes(attacker.attackType)) return 2 * attacker.attack * attacker.units;
    return attacker.attack * attacker.units;
}

function selectTarget(groups) {
    groups = sortSelection(groups);
    const defenders = [];
    for (const attacker of groups) {
        let opponents = groups.filter((g) => g.team !== attacker.team && !defenders.includes(g.id) && !g.immunities.includes(attacker.attackType));
        if (opponents.length > 0) {
            opponents.sort((g1, g2) => {
                const dealDamage1 = calcDamage(attacker, g1);
                const dealDamage2 = calcDamage(attacker, g2);
                if (dealDamage1 !== dealDamage2) return dealDamage2 - dealDamage1;
                const effPowerDiff = g2.units * g2.attack - g1.units * g1.attack;
                if (effPowerDiff === 0) {
                    return g2.initiative - g1.initiative;
                }
                return effPowerDiff;
            });
            attacker.attackTo = opponents[0].id;
            defenders.push(opponents[0].id);
        } else {
            attacker.attackTo = null;
        }
    }
}

function attack(groups) {
    groups = groups.sort((g1, g2) => g2.initiative - g1.initiative);
    let isKilled = false;
    for (const attacker of groups) {
        if (attacker.attackTo && attacker.units > 0) {
            const defender = groups.find((g) => g.id === attacker.attackTo);
            const damage = calcDamage(attacker, defender);
            if (Math.floor(damage / defender.hp) > 0) isKilled = true;
            defender.units -= Math.floor(damage / defender.hp);
        }
    }
    return isKilled;
}

function war(groups, boost) {
    groups.forEach((g) => {
        if (g.team === "immune") g.attack += boost;
    });
    let infections;
    let isKilled;
    do {
        selectTarget(groups);
        isKilled = attack(groups);
        groups = groups.filter((g1) => g1.units > 0);
        infections = groups.filter((g1) => g1.team === "infection");
    } while (isKilled && infections.length !== groups.length && infections.length !== 0);
    if (infections.length === 0) return groups.reduce((sum, g) => (sum += g.units), 0);
    return -1;
}

function findMinBoost(input) {
    let boost = 1;
    let result = -1;
    while (result < 0) {
        result = war(readGroups(input), boost);
        boost++;
    }
    return result
}

console.log(`Answer: ${findMinBoost(input)}`);
console.log(`Run time: ${Date.now() - start} ms`);
