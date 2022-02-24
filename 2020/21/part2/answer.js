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

function translate(map) {
    const cache = [];
    for (const allergen in map) {
        cache.push({ allergen, ingredients: map[allergen] });
    }
    const translation = new Map();
    while (cache.length > 0) {
        const { allergen, ingredients } = cache.shift();
        if (ingredients.length === 1) translation.set(ingredients[0], allergen);
        else cache.push({ allergen, ingredients: ingredients.filter((ingredient) => !translation.has(ingredient)) });
    }
    return [...translation.keys()].sort((a, b) => translation.get(a).localeCompare(translation.get(b)));
}
const { map } = getAllergenMap(foods);

console.log(`Answer: ${translate(map).join(",")}`);
console.timeEnd("Run time");
