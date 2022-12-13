import {example, stardata} from "./13-data.js";
import {mulNumbers} from "../reusable/reducer.js";

const parse = (data) =>
    data.split("\n\n").map(pair => pair.split("\n").map(row => JSON.parse(row)));

/**
 *
 * @param left
 * @param right
 * @returns {number}
 */
function compare(left, right) {
    let valid = 0;
    const leftA = Array.isArray(left);
    const rightA = Array.isArray(right);
    if (leftA && rightA) {
        let i = 0;
        for (; i < left.length && valid == 0; i++) {
            if (i >= right.length) {
                valid = 1
                break;
            }
            valid = compare(left[i], right[i]);

        }
        if (valid == 0 && i == left.length && left.length < right.length) {
            valid = -1;
        }
    } else if (!leftA && !rightA) {
        if (left != right) {
            valid = left < right ? -1 : 1;
        }
    } else if (!leftA && rightA) {
        valid = compare([left], right)
    } else {
        valid = compare(left, [right])
    }
    return valid;
}

const data = stardata;
const parsed = parse(data);

const orderedPairSum = parsed.reduce((s, [left, right], i) => {
    if (compare(left, right) == -1) {
        s += i + 1;
    }
    return s;
}, 0)

console.log("⭐ Determine which pairs of packets are already in the right order. What is the sum of the indices of those pairs?", orderedPairSum);
const allLines = parsed.flat();
const extra = [[[2]], [[6]]]
allLines.push(...extra);
allLines.sort(compare);
const key = extra.map(k => allLines.indexOf(k) + 1).reduce(mulNumbers, 1);
console.log("⭐⭐ Organize all of the packets into the correct order. What is the decoder key for the distress signal?", key);
