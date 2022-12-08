import {example, stardata} from "./08-data.js";

const data = stardata;

const grid = data.split("\n").map(s=>s.split("").map(c=>parseInt(c)));

const countVisibleTrees = (grid)=>{
    const visible = grid.map((row)=>row.map(cell=>false));
    for (let i =0;i<grid.length;i++){
        let lastForward = -1;
        let lastBackward = -1;
        for (let j =0; j< grid[i].length;j++){
            if (grid[i][j]>lastForward){
                lastForward=grid[i][j];
                visible[i][j]=true;
            }
            const backwardIndex = grid[i].length-1-j
            if (grid[i][backwardIndex]>lastBackward){
                lastBackward=grid[i][backwardIndex];
                visible[i][backwardIndex]=true;
            }
        }
    }
    for (let i =0;i<grid[0].length;i++){
        const column = grid.map(row=>row[i]);
        let lastForward = -1;
        let lastBackward = -1;
        for (let j =0; j< column.length;j++){
            if (column[j]>lastForward){
                lastForward=column[j];
                visible[j][i]=true;
            }
            const backwardIndex = column.length-1-j;
            if (column[backwardIndex]>lastBackward){
                lastBackward=column[backwardIndex];
                visible[backwardIndex][i]=true;
            }
        }
    }
    return visible.flat().filter(x=>x).length;
}


const totalVisible = countVisibleTrees(grid)




console.log("⭐ Consider your map; how many trees are visible from outside the grid?",totalVisible);

console.log("⭐⭐ ");
