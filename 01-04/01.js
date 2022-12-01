import {example, stardata} from "./01-data.js";


const data = stardata;

const allElves = data.split("\n\n")
    .map(elf => elf.split("\n")
        .reduce((a, b) => parseInt(b) + a, 0));
allElves.sort((a, b) => Math.sign(b - a));
console.log("⭐ Find the Elf carrying the most Calories. How many total Calories is that Elf carrying?", allElves[0]);

const firstThreeSum = allElves.reduce((a, b, i) => i < 3 ? a + b : a);
console.log("⭐⭐ Find the top three Elves carrying the most Calories. How many Calories are those Elves carrying in total?", firstThreeSum);

