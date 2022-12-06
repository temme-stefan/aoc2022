import {example, stardata} from "./06-data.js";

const data = stardata.split("\n");

const test = (s)=>new Set(s).size==4;

const result = data.map(s=>{
    for (let i =0;i<s.length-4;i++){
        if (test(s.substring(i,i+4))){
            return i+4;
        }
    }
    return -1;
})


console.log("⭐ How many characters need to be processed before the first start-of-packet marker is detected?", result);

console.log("⭐⭐ ");
