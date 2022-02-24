console.time("Run time");
const fs = require("fs");
const input = fs.readFileSync("./input.txt").toString();
const foods = [];
input.split(/\r?\n/).forEach((line) => {
    const [ingredients, allergens] = line.split(" (contains ");
    foods.push({ ingredients: ingredients.split(" "), allergens: allergens.slice(0, -1).split(", ") });
});

function intersection(array1, array2) {
    return array1.filter((value) => array2.includes(value));
}

function getAllergenMap(foods) {
    const map = {};
    for (const food of foods) {
        food.allergens.forEach((allergen) => {
            if (map[allergen] === undefined) map[allergen] = food.ingredients;
            else map[allergen] = intersection(map[allergen], food.ingredients);
        });
    }
    const allergic = new Set();
    for (const allergen in map) {
        map[allergen].forEach((ingredient) => allergic.add(ingredient));
    }
    return { map, allergic: [...allergic.values()] };
}

const { map, allergic } = getAllergenMap(foods);
const safeFoodCount = foods.reduce((sum, food) => (sum += food.ingredients.filter((ingredient) => !allergic.includes(ingredient)).length), 0);

console.log(`Answer: ${safeFoodCount}`);
console.timeEnd("Run time");
