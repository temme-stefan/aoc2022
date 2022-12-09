import {example, stardata} from "./09-data.js";

/**
 * @param tail {{x:number,y:number}}
 * @param trace {Set}
 */
const setVisit = (tail, trace) => {
    trace.add(`${tail.x}_${tail.y}`);
}

/**
 * @param head {{x:number,y:number}}
 * @param direction {"R"|"L"|"U"|"D"}
 */
const moveHead = (head, direction) => {
    switch (direction) {
        case "R":
            head.x++;
            break;
        case "L":
            head.x--;
            break;
        case "U":
            head.y--;
            break;
        case "D":
            head.y++;
            break;
    }
}

/**
 *
 * @param tail {{x:number,y:number}}
 * @param head {{x:number,y:number}}
 */
const moveTail = (tail, head) => {
    const dx = head.x - tail.x;
    const aDx = Math.abs(dx);
    const dy = head.y - tail.y;
    const aDy = Math.abs(dy);
    const move = aDx > 1 || Math.abs(aDy) > 1;
    if (move) {
        if (aDx === 2) {
            tail.x += Math.sign(dx);
            if (dy !== 0) {
                tail.y += Math.sign(dy);
            }
        } else {
            //aDy==2
            tail.y += Math.sign(dy);
            if (dx !== 0) {
                tail.x += Math.sign(dx);
            }
        }
    }
}

/**
 *
 * @param motions {{steps: number, direction: "R"|"L"|"U"|"D"}[]}
 * @param ropeSize {number}
 * @returns {number}
 */
const doMotions = (motions, ropeSize = 2) => {
    const trace = new Set();

    const knots = Array.from({length: ropeSize}).map(_ => {
        return {x: 0, y: 0}
    });

    motions.forEach(({direction, steps}) => {
        for (let i = 0; i < steps; i++) {
            moveHead(knots[0], direction);
            for (let j = 1; j < knots.length; j++) {
                moveTail(knots[j], knots[j - 1]);
            }
            setVisit(knots[ropeSize - 1], trace);
        }
    })
    return trace.size;
}

const data = stardata;

const motions = data.split("\n").map(s => {
    const parts = s.split(" ");
    return {
        direction: parts[0],
        steps: parseInt(parts[1])
    }
})

console.log("⭐ Simulate your complete hypothetical series of motions. How many positions does the tail of the rope visit at least once?", doMotions(motions));

console.log("⭐⭐ Simulate your complete series of motions on a larger rope with ten knots. How many positions does the tail of the rope visit at least once?", doMotions(motions, 10));
