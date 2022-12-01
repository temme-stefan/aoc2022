import {example, stardata} from "./01-data.js";


const data = stardata;

const allElves = data.split("\n\n")
    .map(elf => elf.split("\n")
        .reduce((a, b) => parseInt(b) + a, 0));
const sumTopN = (n)=>{
    return allElves.reduce((topN,elf)=>{
        topN.push(elf);
        topN.sort((a, b) => Math.sign(b - a));
        topN.length=Math.min(topN.length,n);
        return topN;
    },[]).reduce((a,b)=>a+b)
}

console.log("⭐ Find the Elf carrying the most Calories. How many total Calories is that Elf carrying?", sumTopN(1));

console.log("⭐⭐ Find the top three Elves carrying the most Calories. How many Calories are those Elves carrying in total?", sumTopN(3));

