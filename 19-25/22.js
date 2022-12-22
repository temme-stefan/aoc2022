import {example, stardata} from "./22-data.js";
import {maxNumber} from "../reusable/reducer.js";

const parse = (data) => {
    const [mapString, operationString] = data.split("\n\n");
    const max = mapString.split("\n").map(r => r.length).reduce(maxNumber, 0);
    const map = mapString.split("\n").map(r => r.padEnd(max, " ").split(""));


    const pattern = /((L|R)|\d+)/g
    const operations = [];
    let match;
    while (match = pattern.exec(operationString)) {
        if (match[2]) {
            operations.push(match[2]);
        } else {
            operations.push(parseInt(match[1]));
        }
    }
    const position = [0, map[0].findIndex(c => c == ".")];

    return {map, operations, position, facing: 0} //top:3, right:0, bottom:1, left:2
}

const getNext = (map, position, facing) => {
    const walker = [facing == 3 ? -1 : facing == 1 ? 1 : 0, facing == 0 ? 1 : facing == 2 ? -1 : 0];
    const inc = (p) => [(p[0] + walker[0] + map.length) % map.length, (p[1] + walker[1] + map[p[0]].length) % map[p[0]].length];
    let p = inc(position);
    while (map[p[0]].length - 1 < p[1] || map[p[0]][p[1]] == " ") {
        p = inc(p);
    }
    return p;
}

const walkMap = (map, position, facing, steps) => {

    let canWalk = true;
    while (canWalk && steps > 0) {
        const next = getNext(map, position, facing);
        if (map[next[0]][next[1]] == ".") {
            position = next;
        } else {
            canWalk = false;
        }
        steps--;
    }
    return position;
}

const drawMap = (map, pos) => {
    const copy = [...map].map(r => [...r]);
    copy[pos[0]][pos[1]] = "X"
    console.log(copy.map(r => r.join("")).join("\n"));
}

const passwort = ({position, facing}) => {
    return 1000 * (position[0] + 1) + 4 * (position[1] + 1) + facing;
}


const data = stardata;


const {operations, ...state} = parse(data);

const result = operations.reduce(({position, facing, map}, o) => {
    if (Number.isInteger(o)) {
        position = walkMap(map, position, facing, o);
    } else {
        if (o == "L") {
            facing = (facing + 3) % 4;
        } else {
            facing = (facing + 1) % 4;
        }
    }
    return {position, facing, map};
}, state)



console.log("⭐ Follow the path given in the monkeys' notes. What is the final password?", passwort(result));

const cubeSize = data == example?4:50;
//Idea: manually cubing, walk over the edge also needs turning.
/**
 *   1 2
 *   3
 * 4 5
 * 6
 *
 * 1=>2 right => right 0,99=>0,100 49,99=>49,100
 * 1=>3 regular down 49,50=>50,50 49,99=>50,99
 * 1=>4 left => right 0,50=>149,0 49,50=>100,0
 * 1=>6 up => right 0,50 => 150,0 0,99 =>199,0
 *
 * 2=>1 regular left
 * 2=>3 down =>left 49,100 => 50,50 49,149 => 99,50
 * 2=>5 right => left
 * 2=>6 up => up
 *
 * 3=>1 regular up
 * 3=>2 right => up 50,50 => 49,100 99,50 => 49,149
 * 3=>5 regular down
 * 3=>4 left => down
 *
 * 4=>1 left => right
 * 4=>3 up => right
 * 4=>5 regular right
 * 4=>6 regular down
 *
 * 5=>2 right => left
 * 5=>3 regular up
 * 5=>4 regular left
 * 5=>6 down => left
 *
 * 6=>1 left => down
 * 6=>2 down => down
 * 6=>4 regular up
 * 5=>6 right => up
 */

console.log("⭐⭐ ",state.map.length,state.map[0].length);
