import {example, stardata} from "./08-data.js";
import {maxNumber, mulNumbers} from "../reusable/reducer.js";

const data = stardata;

const grid = data.split("\n").map(s => s.split("").map(c => parseInt(c)));

const countVisibleTrees = (grid) => {
    const visible = grid.map((row) => row.map(cell => false));
    for (let i = 0; i < grid.length; i++) {
        let lastForward = -1;
        let lastBackward = -1;
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] > lastForward) {
                lastForward = grid[i][j];
                visible[i][j] = true;
            }
            const backwardIndex = grid[i].length - 1 - j
            if (grid[i][backwardIndex] > lastBackward) {
                lastBackward = grid[i][backwardIndex];
                visible[i][backwardIndex] = true;
            }
        }
    }
    for (let i = 0; i < grid[0].length; i++) {
        const column = grid.map(row => row[i]);
        let lastForward = -1;
        let lastBackward = -1;
        for (let j = 0; j < column.length; j++) {
            if (column[j] > lastForward) {
                lastForward = column[j];
                visible[j][i] = true;
            }
            const backwardIndex = column.length - 1 - j;
            if (column[backwardIndex] > lastBackward) {
                lastBackward = column[backwardIndex];
                visible[backwardIndex][i] = true;
            }
        }
    }
    return visible.flat().filter(x => x).length;
}


const totalVisible = countVisibleTrees(grid)


console.log("⭐ Consider your map; how many trees are visible from outside the grid?", totalVisible);


const countFromWithin = (grid) => {
    const visibleCount = grid.map((row) => row.map(cell => 0));
    const getScenicScore = (i, j) => {
        const baseHeight = grid[i][j];
        let blocked = false;
        let count = [0, 0, 0, 0];
        for (let k = i + 1; k < grid.length && !blocked; k++) {
            count[0]++;
            blocked = grid[k][j] >= baseHeight;
        }
        blocked = false;
        for (let k = i - 1; k >= 0 && !blocked; k--) {
            count[1]++;
            blocked = grid[k][j] >= baseHeight;
        }
        blocked = false;
        for (let k = j + 1; k < grid[i].length && !blocked; k++) {
            count[2]++;
            blocked = grid[i][k] >= baseHeight;
        }
        blocked = false;
        for (let k = j - 1; k >= 0 && !blocked; k--) {
            count[3]++;
            blocked = grid[i][k] >= baseHeight;
        }
        return count.reduce(mulNumbers, 1);
    }
    for (let i = 1; i < grid.length - 1; i++) {
        for (let j = 1; j < grid.length - 1; j++) {
            visibleCount[i][j] = getScenicScore(i, j);
        }
    }


    return visibleCount.flat().reduce(maxNumber,0)
}

const countWithin = countFromWithin(grid);

console.log("⭐⭐ Consider each tree on your map. What is the highest scenic score possible for any tree?" ,countWithin);
