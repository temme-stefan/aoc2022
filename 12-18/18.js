import {example, example_xs, stardata} from "./18-data.js";
import {sumNumbers} from "../reusable/reducer.js";

class P3{
    static #lookup = new Map();
    static #getKey = (a,b,c)=>`${a}_${b}_${c}`
    static getP3 = (a,b,c)=>{
        const key = P3.#getKey(a,b,c);
        if (!P3.#lookup.has(key)){
            P3.#lookup.set(key,new P3(a,b,c));
        }
        return P3.#lookup.get(key);
    }
    #a=0;
    #b=0;
    #c=0;
    constructor(a,b,c) {
        this.#a=a;
        this.#b=b;
        this.#c=c;
    }

    getAdjacent(){
        return [[-1,0,0],[1,0,0],[0,-1,0],[0,1,0],[0,0,-1],[0,0,1]].map(([a,b,c])=>{
            return P3.getP3(this.#a+a,this.#b+b,this.#c+c);
        })
    }

    toString(){
        return P3.#getKey(this.#a,this.#b,this.#c)
    }
}

const parse = (data)=>{
    return data.split("\n").map(r=>P3.getP3(...r.split(",").map(x=>parseInt(x))));
}

const data = stardata;

const cubes = parse(data);
const lookup = new Set(cubes);
const surface = cubes.map(c=>c.getAdjacent().filter(a=>!lookup.has(a)).length).reduce(sumNumbers,0);

console.log("⭐ What is the surface area of your scanned lava droplet?", surface);

console.log("⭐⭐ ");
