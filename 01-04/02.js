import {example, stardata} from "./02-data.js";
import {sumNumbers} from "../reusable/reducer.js";

const data = stardata.split("\n");

const scores = new Map(["A", "B", "C"].map((other, i) => ["X", "Y", "Z"].map((own, j) => {
    const key = `${other} ${own}`;
    let score = j + 1;
    switch ((i - j + 3) % 3) {
        case 0:
            score += 3;
            break;
        case 1:
            score += 0;
            break;
        case 2:
            score += 6
            break;

    }
    return [key, score];
})).flat());

const total = data.map(a=>scores.get(a)).reduce(sumNumbers);

console.log("⭐ What would your total score be if everything goes exactly according to your strategy guide?", total);

const correctScores = new Map(["A", "B", "C"].map((other, i) => ["X", "Y", "Z"].map((strategie) => {
    const key = `${other} ${strategie}`;
    let score = 1; //offset
    switch (strategie) {
        case "X":
            score += (i+2)%3;
            break;
        case "Y":
            score += i+3;
            break;
        case "Z":
            score += (i+1)%3+6;
            break;

    }
    return [key, score];
})).flat());

const correctTotal = data.map(a=>correctScores.get(a)).reduce(sumNumbers);
console.log("⭐⭐ Following the Elf's instructions for the second column, what would your total score be if everything goes exactly according to your strategy guide?", correctTotal);
