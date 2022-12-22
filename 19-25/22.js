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

//Idea: manually cubing, walk over the edge also needs turning.
const mapToCubeStar = (map) => {
    const cube = map.map((r, i) => r.map((c, j) => {
        if (c == " ") {
            return null;
        } else {
            return {
                value: c,
                getNext: (dir) => {
                    const atEdge = dir == 0 && j % 50 == 49
                        || dir == 2 && j % 50 == 0
                        || dir == 1 && i % 50 == 49
                        || dir == 3 && i % 50 == 0;
                    if (atEdge) {
                        //   1 2
                        //   3
                        // 4 5
                        // 6
                        const blockRow = (i - i % 50) / 50;
                        const blockCol = (j - j % 50) / 50;
                        switch (true) {
                            //1=>2 r=>r
                            case dir == 0 && blockRow == 0 && blockCol == 1:
                            //1=>3 d=>d
                            case dir == 1 && blockRow == 0 && blockCol == 1:
                            //2=>1 l=>l
                            case dir == 2 && blockRow == 0 && blockCol == 2:
                            //3=>5 d=>d
                            case dir == 1 && blockRow == 1 && blockCol == 1:
                            //3=>1 u=>u
                            case dir == 3 && blockRow == 1 && blockCol == 1:
                            //4=>5 r=>r
                            case dir == 0 && blockRow == 2 && blockCol == 0:
                            //4=>6 d=>d
                            case dir == 1 && blockRow == 2 && blockCol == 0:
                            //5=>4 l=>l
                            case dir == 2 && blockRow == 2 && blockCol == 1:
                            //5=>3 u=>u
                            case dir == 3 && blockRow == 2 && blockCol == 1:
                            //6=>4 u=>u
                            case dir == 3 && blockRow == 3 && blockCol == 0:
                                return {
                                    pos: getNext(map, [i, j], dir),
                                    dir
                                }

                            //1=>4 l=>r
                            case dir == 2 && blockRow == 0 && blockCol == 1:
                                return {
                                    pos: [149 - i, 0],
                                    dir: 0
                                }
                            //1=>6 u=>r
                            case dir == 3 && blockRow == 0 && blockCol == 1:
                                return {
                                    pos: [j + 100, 0],
                                    dir: 0
                                }

                            //2=>5 r=>l
                            case dir == 0 && blockRow == 0 && blockCol == 2:
                                return {
                                    pos: [149 - i, 99],
                                    dir: 2
                                }
                            //2=>3 d=>l
                            case dir == 1 && blockRow == 0 && blockCol == 2:
                                return {
                                    pos: [j - 50, 99],
                                    dir: 2
                                }
                            //2=>6 u=>u
                            case dir == 3 && blockRow == 0 && blockCol == 2:
                                return {
                                    pos: [199, j - 100],
                                    dir: 3
                                }

                            //3=>2 r=>u
                            case dir == 0 && blockRow == 1 && blockCol == 1:
                                return {
                                    pos: [49, i + 50],
                                    dir: 3
                                }
                            //3=>4 l=>d
                            case dir == 2 && blockRow == 1 && blockCol == 1:
                                return {
                                    pos: [100, i - 50],
                                    dir: 1
                                }

                            //4=>1 l=>r
                            case dir == 2 && blockRow == 2 && blockCol == 0:
                                return {
                                    pos: [149 - i, 50],
                                    dir: 0
                                }
                            //4=>3 u=>r
                            case dir == 3 && blockRow == 2 && blockCol == 0:
                                return {
                                    pos: [j + 50, 50],
                                    dir: 0
                                }

                            //5=>2 r=>l
                            case dir == 0 && blockRow == 2 && blockCol == 1:
                                return {
                                    pos: [149 - i, 149],
                                    dir: 2
                                }
                            //5=>6 d=>l
                            case dir == 1 && blockRow == 2 && blockCol == 1:
                                return {
                                    pos: [j + 100, 49],
                                    dir: 2
                                }

                            //6=>5 r=>u
                            case dir == 0 && blockRow == 3 && blockCol == 0:
                                return {
                                    pos: [149, i - 100],
                                    dir: 3
                                }
                            //6=>2 d=>d
                            case dir == 1 && blockRow == 3 && blockCol == 0:
                                return {
                                    pos: [0, j + 100],
                                    dir: 1
                                }
                            //6=>1 l=>d
                            case dir == 2 && blockRow == 3 && blockCol == 0:
                                return {
                                    pos: [0, i - 100],
                                    dir: 1
                                }

                        }
                    } else {
                        return {
                            pos: getNext(map, [i, j], dir),
                            dir
                        }
                    }
                }
            }
        }
    }))
    return cube;
}

const walkCube = (cube, position, facing, steps) => {
    let canWalk = true;
    while (canWalk && steps > 0) {
        const current = cube[position[0]][position[1]];
        const {pos: nextPos, dir: nextDir} = current.getNext(facing);
        const lookAt = cube[nextPos[0]][nextPos[1]];
        if (lookAt.value == ".") {
            position = nextPos;
            facing = nextDir;
        } else {
            canWalk = false;
        }
        steps--;
    }
    return {position, facing};
}

const cube = mapToCubeStar(state.map);

const result2 = operations.reduce(({position, facing, map}, o) => {
    if (Number.isInteger(o)) {
        const next = walkCube(map, position, facing, o);
        return {map, ...next};
    } else {
        if (o == "L") {
            facing = (facing + 3) % 4;
        } else {
            facing = (facing + 1) % 4;
        }
    }
    return {position, facing, map};
}, {...state, map: cube})

console.log("⭐⭐ Fold the map into a cube, then follow the path given in the monkeys' notes. What is the final password?", passwort(result2));
