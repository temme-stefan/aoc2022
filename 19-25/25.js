import {example, stardata} from "./25-data.js";
import {sumNumbers} from "../reusable/reducer.js";

const literalToValue = new Map(["=", "-", "0", "1", "2"].map((c, i) => [c, i - 2]));
const valueToLiteral = new Map([...literalToValue.entries()].map(([s, d]) => [d, s]));

const snafuToDec = (arr) => {
    return [...arr].reverse().reduce((a, l, i) => a + literalToValue.get(l) * Math.pow(5, i), 0);
};

const decToSnafU = (dec) => {
    const snafu = [];
    while (dec > 0) {
        const r = (dec % 5) % 5;
        const val = r < 3 ? r : r - 5;
        snafu.unshift(valueToLiteral.get(val));
        dec = (dec - val) / 5;
    }
    return snafu;
}


const data = stardata.split("\n").map(s => s.split(""));

const result = decToSnafU(data.map(snafuToDec).reduce(sumNumbers)).join("");

console.log("⭐ The Elves are starting to get cold. What SNAFU number do you supply to Bob's console.", result);

console.log("⭐⭐ ");
