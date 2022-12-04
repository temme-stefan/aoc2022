import {example, stardata} from "./04-data.js";

const data = stardata.split("\n");
const splitElves = (s) => s.split(",");
const toIntervall = (s) => s.split("-").map(x => parseInt(x));

const fullyContain = ([s1, e1], [s2, e2]) => s1 <= s2 && e1 >= e2 || s2 <= s1 && e2 >= e1;

const containing = data.map(x => splitElves(x).map(toIntervall))
    .filter(([i1, i2]) => fullyContain(i1, i2)).length;

console.log("⭐ In how many assignment pairs does one range fully contain the other?", containing);

console.log("⭐⭐ ");
