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
const moveTail = (tail,head) =>{
    const dx = head.x-tail.x;
    const aDx = Math.abs(dx);
    const dy = head.y-tail.y;
    const aDy = Math.abs(dy);
    const move = aDx>1 || Math.abs(aDy>1);
    if (move){
        if (aDx==2){
            tail.x+=Math.sign(dx);
            if (dy!=0){
                tail.y+=Math.sign(dy);
            }
        }
        else{
            //aDy==2
            tail.y+=Math.sign(dy);
            if (dx!=0){
                tail.x+=Math.sign(dx);
            }
        }
    }
}

/**
 *
 * @param motions {{steps: number, direction: "R"|"L"|"U"|"D"}[]}
 * @returns {number}
 */
const doMotions = (motions) => {
    const trace = new Set();

    const head = {
        x: 0,
        y: 0,
    };

    const tail = {x: 0, y: 0}

    setVisit(tail, trace);

    motions.forEach(({direction, steps}) => {
        for (let i = 0; i < steps; i++) {
            moveHead(head, direction);
            moveTail(tail,head);
            setVisit(tail,trace);
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

const visitedByTail = doMotions(motions);

console.log("⭐ Simulate your complete hypothetical series of motions. How many positions does the tail of the rope visit at least once?", visitedByTail);

console.log("⭐⭐ ");
