import {example, stardata} from "./20-data.js";
import {sumNumbers} from "../reusable/reducer.js";

const parse = (data) => {
    return data.split("\n").map((r, i) => {
        return {ind: i, val: parseInt(r)}
    })
}

const getCoordinates = (data,lookAt=[1000,2000,3000])=>{
    const zero = data.findIndex(v=>v.val==0);
    return lookAt.map(at=>data[(zero+at)%data.length].val).reduce(sumNumbers);
}

const data = stardata;
const parsed = parse(data);

const result = [...parsed];
for (let i = 0; i < parsed.length; i++) {
    let c = parsed[i];
    const at = result.indexOf(c);
    result.splice(at, 1);
    const newAt = (at + (c.val<0?c.val-1:c.val) + result.length) % result.length;
    // if (newAt == 0 && c.val!=0){
    //     result.push(c);
    // }
    // else {
        result.splice(newAt, 0, c);
    // }
}
console.log(result)


console.log("⭐ Mix your encrypted file exactly once. What is the sum of the three numbers that form the grove coordinates?", getCoordinates(result));

console.log("⭐⭐ ");
