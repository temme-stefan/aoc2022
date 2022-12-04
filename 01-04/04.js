import {example, stardata} from "./04-data.js";

const data = stardata.split("\n");
const splitElves = (s) => s.split(",");
const toIntervall = (s) => s.split("-").map(x => parseInt(x));

const inIntervall = (n,[s,e])=>s<=n && e>=n;

const fullyContain = ([s1, e1], [s2, e2]) => s1 <= s2 && e1 >= e2 || s2 <= s1 && e2 >= e1;

const overlap = (i1,i2) => inIntervall(i1[0],i2) || inIntervall(i1[1],i2) || inIntervall(i2[0],i1) || inIntervall(i2[1],i1);

const intervallPairs = data.map(x => splitElves(x).map(toIntervall))
const containing = intervallPairs.filter(([i1, i2]) => fullyContain(i1, i2)).length;
const overlapping = intervallPairs.filter(([i1,i2])=>overlap(i1,i2)).length

console.log("⭐ In how many assignment pairs does one range fully contain the other?", containing);

console.log("⭐⭐ In how many assignment pairs do the ranges overlap?",overlapping);
