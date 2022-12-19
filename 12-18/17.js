import {example, stardata} from "./17-data.js";

function* partGenerator(parts, width, leftedge, bottom, rocks) {
    const fallingUnits = parts.map(pattern => {
        const rows = pattern.split("\n");
        const unit = Array.from({length: rows.length + bottom})
            .map((_, i) => Array.from({length: width})
                .map((__, j) => i < rows.length && j >= leftedge && j - leftedge < rows[i].length && rows[i][j - leftedge] == "#"
                )
            );
        return unit;
    })
    let i = 0;
    while (i < rocks) {
        yield fallingUnits[i++ % fallingUnits.length].map(r => [...r]);
    }
}

function* gasSteam(data) {
    let i = 0;
    while (true) {
        yield data[i++ % data.length];
    }
}

function canMoveLeft(stack, unit, intersectionlevel) {
    const unitMoveAble = unit.every(r => !r[0]);
    let stackmoveable = unitMoveAble;
    for (let i = 0; i < intersectionlevel && stackmoveable; i++) {
        const sRow = stack[stack.length - intersectionlevel + i]
        const uRow = unit[unit.length - 1 - i];
        stackmoveable = uRow.every((c, j) => j == 0 || !c || sRow && !sRow[j - 1]);
    }
    return stackmoveable;
}

function moveLeft(unit) {
    unit.forEach(r => {
        r.shift();
        r.push(false)
    })
}

function canMoveRight(stack, unit, intersectionlevel) {
    const unitMoveAble = unit.every(r => !r[r.length - 1]);
    let stackmoveable = unitMoveAble;
    for (let i = 0; i < intersectionlevel && stackmoveable; i++) {
        const sRow = stack[stack.length - intersectionlevel + i]
        const uRow = unit[unit.length - 1 - i];
        stackmoveable = uRow.every((c, j) => j == uRow.length - 1 || !c || sRow && !sRow[j + 1]);
    }
    return stackmoveable;
}

function moveRight(unit) {
    unit.forEach(r => {
        r.unshift(false);
        r.pop();
    })
}

function canMoveDown(stack, unit, intersectionlevel) {
    let stackmoveable = true;
    for (let i = 0; i < intersectionlevel && stackmoveable; i++) {
        const sRow = stack[stack.length - intersectionlevel + i - 1];
        const uRow = unit[unit.length - 1 - i];
        stackmoveable = uRow.every((c, j) => !c || sRow && !sRow[j]);
    }
    return stackmoveable;
}

function union(stack, unit, intersectionlevel) {
    while (intersectionlevel > stack.length) {
        unit.pop();
        intersectionlevel--;
    }
    for (let i = 0; i < intersectionlevel; i++) {
        const sRow = stack[stack.length - intersectionlevel + i]
        const uRow = unit[unit.length - 1 - i];
        for (let j = 0; j < sRow.length; j++) {
            sRow[j] = sRow[j] || uRow[j];
        }
    }
    for (let i = intersectionlevel;i<unit.length;i++){
        stack.push(unit[unit.length-i-1]);
    }
}

function dropUnit(stack, unit, steam) {
    let intersectionlevel = 0;
    while (true) {
        const dir = steam.next().value;

        if (dir == "<") {
            if (canMoveLeft(stack, unit, intersectionlevel)) {
                moveLeft(unit);
            }
        } else {
            if (canMoveRight(stack, unit, intersectionlevel)) {
                moveRight(unit);
            }
        }
        if (canMoveDown(stack, unit, intersectionlevel+1)) {
            intersectionlevel++;
        } else {
            union(stack, unit, intersectionlevel);
            break;
        }
    }
}

function printStack(stack){
    console.log([...stack].reverse().map(row=>"|"+row.map(c=>c?"#":".").join("")+"|").join("\n")+"\n+-------+");
}

const data = example;
const parts = `####

.#.
###
.#.

..#
..#
###

#
#
#
#

##
##`.split("\n\n");
const width = 7;
const leftedge = 2;
const bottom = 3;
const rocks = 5//2022;

const partgen = partGenerator(parts, width, leftedge, bottom, rocks)
const steam = gasSteam(data);
let current = partgen.next();
const stack = [];
while (!current.done) {
    dropUnit(stack, current.value, steam);
    current = partgen.next();
    printStack(stack)
}


console.log("⭐ How many units tall will the tower of rocks be after 2022 rocks have stopped falling?" );

console.log("⭐⭐ ");
