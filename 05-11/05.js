import {example, stardata} from "./05-data.js";

const data = stardata;

const [mapdata, actiondata] = data.split("\n\n");

function parseMap() {
    const mapRows = mapdata.split("\n");
    const columns = (mapRows[0].length + 1) / 4;

    const map = Array.from({length: columns}).map(_ => []);
    mapRows.forEach(r => map.forEach((col, i) => {
        const content = r.substring(i * 4, (i + 1) * 4)[1];
        if (content != " ") {
            col.unshift(content);
        }
    }))
    return new Map(map.map(([key, ...data]) => [parseInt(key), data]));
}

const map1 = parseMap();

function parseAction(s) {
    return JSON.parse("{" + s.replace("move", "\"move\":")
        .replace("from", ",\"from\":")
        .replace("to", ",\"to\":") + "}");
}

const actions = actiondata.split("\n").map(parseAction);

const getTopmost = (map) => {
    return [...map.values()].map(col => col[col.length - 1]).join("");
}

const doAction1 = ({move, from, to},map) => {
    const fromCol = map.get(from);
    const toCol = map.get(to);
    for (let i = 0; i < move; i++) {
        toCol.push(fromCol.pop());
    }
}

actions.forEach(a=>doAction1(a,map1));

const topmost1 = getTopmost(map1);

console.log("⭐ After the rearrangement procedure completes, what crate ends up on top of each stack?", topmost1);


const map2 = parseMap();

const doAction2 = ({move, from, to},map) => {
    const fromCol = map.get(from);
    const toCol = map.get(to);
    const temp = [];
    for (let i = 0; i < move; i++) {
        temp.push(fromCol.pop());
    }
    for (let i = 0; i < move; i++) {
        toCol.push(temp.pop());
    }
}

actions.forEach(a=>doAction2(a,map2));

const topmost2 = getTopmost(map2);

console.log("⭐⭐ After the rearrangement procedure completes, what crate ends up on top of each stack?",topmost2);
