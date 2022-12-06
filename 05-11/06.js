import {example, stardata} from "./06-data.js";

const data = stardata.split("\n");

const test = (s, size) => new Set(s).size == size;

const findFirstNDistinctLetters = (s, size) => {
    for (let i = 0; i < s.length - size; i++) {
        if (test(s.substring(i, i + size), size)) {
            return i + size;
        }
    }
    return -1;
}

const result = data.map(s => {
    return findFirstNDistinctLetters(s, 4);
})


console.log("⭐ How many characters need to be processed before the first start-of-packet marker is detected?", result);

const result2 = data.map(s => {
    return findFirstNDistinctLetters(s, 14);
})

console.log("⭐⭐ How many characters need to be processed before the first start-of-message marker is detected?",result2);
