import {example, example2, stardata} from "./10-data.js";
import {sumNumbers} from "../reusable/reducer.js";

const processData = (data) => {
    const cycles = [1];
    data.forEach(row => {
        const current = cycles[cycles.length - 1]
        if (row == "noop") {
            cycles.push(current);
        } else {
            //addx -?\d+
            const toAdd = parseInt(row.split(" ")[1]);
            cycles.push(current,current+toAdd);
        }
    })
    return cycles;
}

const getSignalStrength = (n, cycles) => n * (cycles.length >= n ? cycles[n-1] : cycles[cycles.length - 1]);

const data = stardata.split("\n");

const cycles = processData(data);

// console.log(cycles.map((c,i,a)=>i==0?"":`Cycle ${i}: start ${a[i-1]} end ${c}`).filter(Boolean).join("\n"));

const result = Array.from({length: 6}).map((_, i) => 20 + i * 40).map(n=>getSignalStrength(n,cycles))
    .reduce(sumNumbers,0);

console.log("⭐ Find the signal strength during the 20th, 60th, 100th, 140th, 180th, and 220th cycles. What is the sum of these six signal strengths?", result);

console.log("⭐⭐ ");
