import {example, example_xs, stardata} from "./18-data.js";
import {sumNumbers} from "../reusable/reducer.js";

class P3 {
    static #isInternalContructing = false;
    static #lookup = new Map();
    static #getKey = (a, b, c) => `${a}_${b}_${c}`
    static getP3 = (a, b, c) => {
        const key = P3.#getKey(a, b, c);
        if (!P3.#lookup.has(key)) {
            P3.#isInternalContructing = true;
            P3.#lookup.set(key, Object.freeze(new P3(a, b, c)));
            P3.#isInternalContructing = false;
        }
        return P3.#lookup.get(key);
    }

    static getBox(points) {
        return [...points].reduce((minmax, c) => {
            minmax.min.a = Math.min(minmax.min.a, c.#a);
            minmax.max.a = Math.max(minmax.max.a, c.#a);
            minmax.min.b = Math.min(minmax.min.b, c.#b);
            minmax.max.b = Math.max(minmax.max.b, c.#b);
            minmax.min.c = Math.min(minmax.min.c, c.#c);
            minmax.max.c = Math.max(minmax.max.c, c.#c);
            return minmax;
        }, {
            min: {a: Number.MAX_VALUE, b: Number.MAX_VALUE, c: Number.MAX_VALUE},
            max: {a: Number.MIN_VALUE, b: Number.MIN_VALUE, c: Number.MIN_VALUE}
        })
    }

    #a = 0;
    #b = 0;
    #c = 0;

    constructor(a, b, c) {
        if (P3.#isInternalContructing) {
            this.#a = a;
            this.#b = b;
            this.#c = c;
        } else {
            throw new TypeError("P3 is not public constructable");
        }
    }


    getAdjacent() {
        return [[-1, 0, 0], [1, 0, 0], [0, -1, 0], [0, 1, 0], [0, 0, -1], [0, 0, 1]].map(([a, b, c]) => {
            return P3.getP3(this.#a + a, this.#b + b, this.#c + c);
        })
    }

    inBox(box) {
        return box.min.a < this.#a && this.#a < box.max.a
            && box.min.b < this.#b && this.#b < box.max.b
            && box.min.c < this.#c && this.#c < box.max.c
    }

    toString() {
        return P3.#getKey(this.#a, this.#b, this.#c)
    }
}

function getInnerCells(cubes) {
    const cubeLookup = new Set(cubes);
    const box = P3.getBox(cubes);
    const inner = new Set()
    const outer = new Set();
    const isOuter = (points) => [...points].some(p => outer.has(p) || !p.inBox(box));
    const isInner = (points) => [...points].some(p => inner.has(p));
    let mayBeInner = [...new Set(cubes.map(c => c.getAdjacent().filter(a => !cubeLookup.has(a))).flat())].map(c => new Set([c]));

    for (let i = 0; i < mayBeInner.length; i++) {
        const cur = mayBeInner[i];
        let foundInner = false;
        let grow=0;
        while (!isOuter(cur) && !foundInner) {
            const s = cur.size;
            const toAdd = [...cur].map(p => p.getAdjacent()).flat(1).filter(p => !cubeLookup.has(p));
            toAdd.forEach(p => cur.add(p));
            foundInner = cur.size == s || isInner(cur);
            grow++;
        }
        if (!foundInner) {
            outer.add(...cur);
        } else {
            inner.add(...cur);
        }
    }
    return inner;
}

const parse = (data) => {
    return data.split("\n").map(r => P3.getP3(...r.split(",").map(x => parseInt(x))));
}

const data = stardata;

const cubes = parse(data);
const cubeLookup = new Set(cubes);
const surface = cubes.map(c => c.getAdjacent().filter(a => !cubeLookup.has(a)).length).reduce(sumNumbers, 0);

console.log("⭐ What is the surface area of your scanned lava droplet?", surface);


const inner = getInnerCells(cubes);
const outerSurface = cubes.map(c => c.getAdjacent().filter(a => !cubeLookup.has(a) && !inner.has(a)).length).reduce(sumNumbers, 0);

console.log("⭐⭐ What is the exterior surface area of your scanned lava droplet?", outerSurface);
