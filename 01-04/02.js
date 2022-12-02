import {example, stardata} from "./02-data.js";

const data = stardata;

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

const total = data.split("\n").reduce((a,b)=>a+scores.get(b) ,0);

console.log(scores);
console.log("⭐ What would your total score be if everything goes exactly according to your strategy guide?", total);

console.log("⭐⭐ ");
