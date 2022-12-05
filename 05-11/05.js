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

const map = parseMap();

function parseAction(s) {
    return JSON.parse("{" + s.replace("move", "\"move\":")
        .replace("from", ",\"from\":")
        .replace("to", ",\"to\":") + "}");
}

const actions = actiondata.split("\n").map(parseAction);

const doAction = ({move, from, to}) => {
    const fromCol = map.get(from);
    const toCol = map.get(to);
    for (let i = 0; i < move; i++) {
        toCol.push(fromCol.pop());
    }
}

actions.forEach(doAction);

const topmost = [...map.values()].map(col => col[col.length - 1]).join("");

console.log("⭐ After the rearrangement procedure completes, what crate ends up on top of each stack?", topmost);

console.log("⭐⭐ ");
