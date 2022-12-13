import {example, stardata} from "./13-data.js";

const parse = (data) =>
    data.split("\n\n").map(pair => pair.split("\n").map(row => JSON.parse(row)));

let nested = 0
function isOrdered(left, right) {
    // console.log("".padStart(nested,"\t"),"Compare",left,"to",right);
    nested++;
    let valid = null;
    const leftA = Array.isArray(left);
    const rightA = Array.isArray(right);
    if (leftA && rightA) {
        let i = 0;
        for (; i < left.length && valid == null; i++) {
            if (i>=right.length){
                valid = false
                // console.log("length break", valid);
                break;
            }
            valid = isOrdered(left[i], right[i]);

        }
        if (valid==null && i== left.length && left.length < right.length){
            valid = true;
        }
    } else if (!leftA && !rightA) {
        if (left != right) {
            valid = left < right;
            // console.log("numberCheck",valid)
        }
    } else if (!leftA && rightA) {
        valid = isOrdered([left], right)
    } else {
        valid = isOrdered(left, [right])
    }
    nested--;
    return valid;
}

const data = stardata;
const parsed = parse(data);

const orderedPairSum = parsed.reduce((s, [left, right], i) => {
    if (isOrdered(left, right)==null){
        console.log(left, "to",right)
    }

    if (isOrdered(left, right)??true) {
        s += i + 1;
    }
    return s;
}, 0)

console.log("⭐ Determine which pairs of packets are already in the right order. What is the sum of the indices of those pairs?", orderedPairSum);
 console.log("⭐⭐ ");
