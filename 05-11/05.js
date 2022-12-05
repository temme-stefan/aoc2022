import {example, stardata} from "./05-data.js";
import {parseSpacePairs} from "../reusable/parser.js";

const data = stardata;

const [mapdata, actiondata] = data.split("\n\n");

const parseMap = () => {
    const mapRows = mapdata.split("\n");
    const columns = (mapRows[0].length + 1) / 4;

    const map = Array.from({length: columns}).map(_ => []);
    mapRows.forEach(r => map.forEach((col, i) => {
        const content = r.substring(i * 4, (i + 1) * 4)[1];
        if (content != " ") {
            col.unshift(content);
        }
    }))
    return new Map(map.map(([key, ...data]) => [key, data]));
}

const parseAction = (s) => {
    const action = parseSpacePairs(s);
    action.move = parseInt(action.move);
    return action;
}
const getActions = () => actiondata.split("\n").map(parseAction);

const getTopmost = (map) => {
    return [...map.values()].map(col => col[col.length - 1]).join("");
}

const runActions = (action) => {
    const map = parseMap();
    const actions = getActions();
    actions.forEach(a => action(a, map));
    return getTopmost(map);
}

const crane9000 = ({move, from, to}, map) => {
    const fromCol = map.get(from);
    const toCol = map.get(to);
    for (let i = 0; i < move; i++) {
        toCol.push(fromCol.pop());
    }
}

console.log("⭐ After the rearrangement procedure completes, what crate ends up on top of each stack?", runActions(crane9000));

const crane9001 = ({move, from, to}, map) => {
    const fromCol = map.get(from);
    const toCol = map.get(to);
    toCol.splice(toCol.length, 0, ...fromCol.splice(fromCol.length - move, move));
}

console.log("⭐⭐ After the rearrangement procedure completes, what crate ends up on top of each stack?", runActions(crane9001));
