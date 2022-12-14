import {example, stardata} from "./14-data.js";

const toKey = (a) => a.join(',');

const getRocks = (data) => {
    let maxY = Number.NEGATIVE_INFINITY;
    const start = [500, 0];
    const r = /(\d+),(\d+)/g;
    const shapes = data.split("\n");
    const rocks = new Map(shapes.map(s => {
        let m;
        const corners = [];
        while (m = r.exec(s)) {
            corners.push([parseInt(m[1]), parseInt(m[2])]);
        }
        return corners.reduce((r, c) => {
            maxY = Math.max(maxY, c[1]);
            const last = r[r.length - 1];
            const dx = c[0] - last[0];
            const dy = c[1] - last[1];
            for (let i = 1; i <= Math.abs(dx); i++) {
                r.push([last[0] + i * Math.sign(dx), last[1]])
            }
            for (let i = 1; i <= Math.abs(dy); i++) {
                r.push([last[0], last[1] + i * Math.sign(dy)]);

            }
            return r;
        }, [corners[0]]);
    }).flat().map(a => [toKey(a), a]));
    return {
        start,
        maxY,
        rocks
    }
}

function getSandsAddedTilVoid(start, maxY, rocks) {
    const blocked = new Map(rocks);
    let isInfinte = false;
    while (!isInfinte) {
        const sandAt = [...start];
        while (!isInfinte) {
            const next = [[sandAt[0], sandAt[1] + 1], [sandAt[0] - 1, sandAt[1] + 1], [sandAt[0] + 1, sandAt[1] + 1]]
                .find(a => !blocked.has(toKey(a)));
            if (next == null) {
                blocked.set(toKey(sandAt), sandAt);
                break;
            } else {
                sandAt[0] = next[0];
                sandAt[1] = next[1];
                isInfinte = sandAt[1] >= maxY;
            }
        }
    }

    const sandAdded = blocked.size - rocks.size;
    return sandAdded;
}

function getSandsAddedTillFloor(start, maxY, rocks) {
    const blocked = new Map(rocks);
    const startKey = toKey(start);
    while (!blocked.has(startKey)) {
        const sandAt = [...start];
        while (!blocked.has(startKey)) {
            const next = [[sandAt[0], sandAt[1] + 1], [sandAt[0] - 1, sandAt[1] + 1], [sandAt[0] + 1, sandAt[1] + 1]]
                .find(a => !blocked.has(toKey(a)));
            if (next == null || next[1]==maxY+2) {
                blocked.set(toKey(sandAt), sandAt);
                break;
            } else {
                sandAt[0] = next[0];
                sandAt[1] = next[1];
            }
        }
    }
    const sandAdded = blocked.size - rocks.size;
    return sandAdded;
}

const data = stardata;
const {start, maxY, rocks} = getRocks(data);

console.log("⭐ Using your scan, simulate the falling sand. How many units of sand come to rest before sand starts flowing into the abyss below?", getSandsAddedTilVoid(start, maxY, rocks));

console.log("⭐⭐ Using your scan, simulate the falling sand until the source of the sand becomes blocked. How many units of sand come to rest?",getSandsAddedTillFloor(start, maxY, rocks));
