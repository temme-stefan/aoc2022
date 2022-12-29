import {example, example_xs, stardata} from "./23-data.js";
import {maxNumber, minNumber} from "../reusable/reducer.js";

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

    static emptyCells(cells){
        const [[xMin, xMax], [yMin, yMax]] = Cell.minMax(cells);
        return (xMax-xMin+1)*(yMax-yMin+1)-[...cells].length;
    }

    static minMax(cells) {
        const x = [...cells].map(c => c.#x);
        const y = [...cells].map(c => c.#y);
        return [
            [x.reduce(minNumber, Number.POSITIVE_INFINITY), x.reduce(maxNumber, Number.NEGATIVE_INFINITY)],
            [y.reduce(minNumber, Number.POSITIVE_INFINITY), y.reduce(maxNumber, Number.NEGATIVE_INFINITY)]
        ]
    }

    static printCells(cells) {
        const result = new Set(cells);
        const [[xMin, xMax], [yMin, yMax]] = Cell.minMax(cells);
        const field = Array.from({length: xMax - xMin + 1})
            .map((_, i) =>
                Array.from({length: yMax - yMin + 1})
                    .map((__, j) => result.has(Cell.getCell(xMin + i, yMin + j)) ? "#" : ".")
            );
        console.log(field.map(r => r.join("")).join("\n"))
    }

    #x = 0;
    #y = 0;

    constructor(x, y) {
        this.#x = x;
        this.#y = y;
    }

    #getNorthNeighbours() {
        return [[-1, -1], [-1, 0], [-1, 1]].map(([a, b]) => Cell.getCell(a + this.#x, b + this.#y));
    }

    #getNorth() {
        return Cell.getCell(-1 + this.#x, 0 + this.#y)
    }

    #getSouthNeighbours() {
        return [[1, -1], [1, 0], [1, 1]].map(([a, b]) => Cell.getCell(a + this.#x, b + this.#y));
    }

    #getSouth() {
        return Cell.getCell(1 + this.#x, 0 + this.#y)
    }

    #getWestNeighbours() {
        return [[-1, -1], [0, -1], [1, -1]].map(([a, b]) => Cell.getCell(a + this.#x, b + this.#y));
    }

    #getWest() {
        return Cell.getCell(0 + this.#x, -1 + this.#y)
    }

    #getEastNeighbours() {
        return [[-1, 1], [0, 1], [1, 1]].map(([a, b]) => Cell.getCell(a + this.#x, b + this.#y));
    }

    #getEast() {
        return Cell.getCell(0 + this.#x, 1 + this.#y)
    }

    #getNeighbours() {
        return [
            [-1, -1], [-1, 0], [-1, 1],
            [0, -1], [0, 1],
            [1, -1], [1, 0], [1, 1]
        ].map(([a, b]) => Cell.getCell(a + this.#x, b + this.#y))
    }

    move(dirs, cellSet) {
        let proposal = null;
        if (this.#getNeighbours().some(c => cellSet.has(c))) {
            for (let i = 0; i < dirs.length && proposal == null; i++) {
                switch (dirs[i]) {
                    case 0:
                        if (this.#getNorthNeighbours().every(c => !cellSet.has(c))) {
                            proposal = this.#getNorth();
                        }
                        break;
                    case 1:
                        if (this.#getSouthNeighbours().every(c => !cellSet.has(c))) {
                            proposal = this.#getSouth();
                        }
                        break;
                    case 2:
                        if (this.#getWestNeighbours().every(c => !cellSet.has(c))) {
                            proposal = this.#getWest();
                        }
                        break;
                    case 3:
                        if (this.#getEastNeighbours().every(c => !cellSet.has(c))) {
                            proposal = this.#getEast();
                        }
                        break;
                }
            }
        }
        return proposal;

    }

    toString() {
        return `${this.#x}_${this.#y}`;
    }
}


function parseData(data) {
    const elves = [];
    data.split("\n").forEach((r, i) =>
        r.split("").forEach((c, j) => {
                if (c == "#") {
                    elves.push(Cell.getCell(i, j));
                }
            }
        )
    )
    return elves;
}


const data = stardata;

function partOne() {
    let elves = parseData(data);
    let moved = true;
    const dir = [0, 1, 2, 3];
    let i = 0;
    while (moved && i<10) {
        // console.log(i);
        // Cell.printCells(elves);
        i++;
        const elvesSet = new Set(elves);
        const moves = elves.map(e => e.move(dir, elvesSet));
        const targets = new Set();
        const noTargets = new Set();
        moves.forEach((proposal) => {
            if (proposal) {
                if (!targets.has(proposal)) {
                    targets.add(proposal);
                } else {
                    noTargets.add(proposal);
                }
            }
        });
        moved = targets.size > 0 && [...targets].some(c => !noTargets.has(c));
        elves = elves.map((e, i) => moves[i] && !noTargets.has(moves[i]) ? moves[i] : e);
        dir.push(dir.shift());
    }

    const result = Cell.emptyCells(elves);
    return result;
}



console.log("⭐ Simulate the Elves' process and find the smallest rectangle that contains the Elves after 10 rounds. How many empty ground tiles does that rectangle contain?",partOne());
function partTwo() {
    let elves = parseData(data);
    let moved = true;
    const dir = [0, 1, 2, 3];
    let i = 0;
    while (moved) {
        // console.log(i);
        // Cell.printCells(elves);
        i++;
        const elvesSet = new Set(elves);
        const moves = elves.map(e => e.move(dir, elvesSet));
        const targets = new Set();
        const noTargets = new Set();
        moves.forEach((proposal) => {
            if (proposal) {
                if (!targets.has(proposal)) {
                    targets.add(proposal);
                } else {
                    noTargets.add(proposal);
                }
            }
        });
        moved = targets.size > 0 && [...targets].some(c => !noTargets.has(c));
        elves = elves.map((e, i) => moves[i] && !noTargets.has(moves[i]) ? moves[i] : e);
        dir.push(dir.shift());
    }
    return i;
}
console.log("⭐⭐ Figure out where the Elves need to go. What is the number of the first round where no Elf moves?",partTwo());
