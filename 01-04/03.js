import {example, stardata} from "./03-data.js";
import {intersectSets, sumNumbers} from "../reusable/reducer.js";

const data = stardata.split("\n");

const getPriority= (c)=>c.toLowerCase()==c?(c.charCodeAt(0)-"a".charCodeAt(0)+1):(c.charCodeAt(0)-"A".charCodeAt(0)+27);

const stringToSet = (compartment)=>[...compartment].reduce((set,letter)=>{set.add(letter); return set;},new Set());



const getDuplicate = (compartments)=>
    [...compartments.map(stringToSet).reduce(intersectSets)][0];

const getCompartments = (backpack)=>[backpack.substring(0,backpack.length/2),backpack.substring(backpack.length/2)];

const prioritySum = data.map(backpack=>getPriority(getDuplicate(getCompartments(backpack)))).reduce(sumNumbers);

const groups = data.reduce((gr,row)=>{
    if(gr[0].length<3){
        gr[0].push(row);
    }
    else{
        gr.unshift([row]);
    }
    return gr;
},[[]])

const badgeSum = groups.map(rows=>getPriority(getDuplicate(rows))).reduce(sumNumbers);

console.log("⭐ Find the item type that appears in both compartments of each rucksack. What is the sum of the priorities of those item types?", prioritySum);

console.log("⭐⭐ Find the item type that corresponds to the badges of each three-Elf group. What is the sum of the priorities of those item types?",badgeSum);
