import {example, stardata} from "./12-data.js";

const createGraph = (data) => {
    let start, end;

    const getElevetaion = (c) => {
        return (c === "S" ? "a" : c === "E" ? "z" : c).charCodeAt(0) - "a".charCodeAt(0);
    }
    const rows = data.split("\n").map((r, i) => [...r].map((c, j) => {
        if (c === "S") {
            start = `${i}_${j}`;
        }
        if (c === "E") {
            end = `${i}_${j}`;
        }
        return getElevetaion(c);
    }));

    const nodes = new Map(rows.map((r, i) => r.map((c, j) => {
        const edges = [[i, j + 1], [i, j - 1], [i - 1, j], [i + 1, j]].filter(([x, y]) => {
            if (x >= 0 && x < rows.length && y >= 0 && y < r.length) {
                const neighbour = rows[x][y];
                return neighbour <= c + 1;
            }
            return false
        }).map(([x, y]) => `${x}_${y}`);
        return [`${i}_${j}`, {
            i,
            j,
            elevation: c,
            edges
        }];
    })).flat());
    return {nodes, start, end};
}

const shortestPath = (start,end,nodes)=>{ //modified BFS
    const visited = new Set();
    const depthMap = new Map([[start,0]]);
    const queue = [start];
    while (queue.length>0 && !depthMap.has(end)){
        const current = queue.shift();
        const childdepth = 1 + depthMap.get(current);
        nodes.get(current).edges.forEach(edge=>{
            if (!depthMap.has(edge)){ // if it has it is a Back edge --> already in queue/visited --> do nothing
                depthMap.set(edge,childdepth);
                queue.push(edge)
            }
        })
    }
    return depthMap.get(end);
}

const data = stardata;

const {nodes, start, end} = createGraph(data);


console.log("⭐ What is the fewest steps required to move from your current position to the location that should get the best signal?",shortestPath(start,end,nodes));

console.log("⭐⭐ ");
