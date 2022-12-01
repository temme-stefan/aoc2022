import {example, firststar} from "./01-data.mjs";


const data = example;
const result = data.split("\n").reduce(({max, current}, line) => {
    if (line == "") {
        current = 0;
    } else {
        current += parseInt(line);
        if (current > max) {
            max = current;
        }
    }
    return {
        max, current
    }
}, {max: 0, current: 0})

console.log("Find the Elf carrying the most Calories. How many total Calories is that Elf carrying?", result.max);
