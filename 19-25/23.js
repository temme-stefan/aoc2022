import {example, stardata} from "./23-data.js";

class Cell {
    static #lookup = new Map();
    static #getKey = (a, b) => `${a}_${b}`;
    static getCell = (a, b) => {
        const key = Cell.#getKey(a, b);
        if (!Cell.#lookup.has(key)) {
            Cell.#lookup.set(key, Object.freeze(new Cell(a, b)));
        }
        return Cell.#lookup.get(key);
    }
    #x = 0;
    #y = 0;

    constructor(x, y) {
        this.#x = x;
        this.#y = y;
    }

    getNorth() {
        return [[-1, -1], [-1, 0], [-1, 1]].map(([a, b]) => Cell.getCell(a + this.#x, b + this.#y));
    }

    getSouth() {
        return [[1, -1], [1, 0], [1, 1]].map(([a, b]) => Cell.getCell(a + this.#x, b + this.#y));
    }

    getWest() {
        return [[-1, -1], [0, -1], [1, -1]].map(([a, b]) => Cell.getCell(a + this.#x, b + this.#y));
    }

    getEast() {
        return [[-1, 1], [0, 1], [1, 1]].map(([a, b]) => Cell.getCell(a + this.#x, b + this.#y));
    }

    getNeighbours() {
        [
            [-1, -1], [-1, 0], [-1, 1],
            [0, -1], [0, 1],
            [1, -1], [1, 0], [1, 1]
        ].map(([a, b]) => Cell.getCell(a + this.#x, b + this.#y))
    }

    toString(){
        return `${this.#x}_${this.#y}`;
    }
}



function parseData(data) {
    const elves = new Set();
    data.split("\n").forEach((r, i) =>
        r.split("").forEach((c, j) => {
                if (c == "#") {
                    elves.add(Cell.getCell(i, j));
                }
            }
        )
    )
    return elves;
}


const data = example;

const elves = parseData(data);

console.log([...elves].map(e=>""+e));

console.log("⭐ Simulate the Elves' process and find the smallest rectangle that contains the Elves after 10 rounds. How many empty ground tiles does that rectangle contain?");

console.log("⭐⭐ ");
