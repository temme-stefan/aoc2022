import {example, stardata} from "./03-data.js";

const data = stardata.split("\n");

const getPriority= (c)=>c.toLowerCase()==c?(c.charCodeAt(0)-"a".charCodeAt(0)+1):(c.charCodeAt(0)-"A".charCodeAt(0)+27);

const getDuplicate = (compartment1,compartment2)=> {
    const {setA,setB} = [...compartment1].reduce(({setA, setB}, c, i) => {
        setA.add(c);
        setB.add(compartment2[i]);
        return {setA, setB}
    }, {
        setA: new Set(),
        setB: new Set()
    });
    return [...setA].find(c=>setB.has(c));
}
const getCompartments = (backpack)=>[backpack.substring(0,backpack.length/2),backpack.substring(backpack.length/2)];

const prioritySum = data.map(backpack=>getPriority(getDuplicate(...getCompartments(backpack)))).reduce((a,b)=>a+b);


console.log("⭐ Find the item type that appears in both compartments of each rucksack. What is the sum of the priorities of those item types?", prioritySum);

console.log("⭐⭐ ");
