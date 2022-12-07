import {example, stardata} from "./07-data.js";
import {sumNumbers} from "../reusable/reducer.js";

class FSElement {

    /**
     * @type string
     */
    name;

    /**
     * @type {null|Dir}
     */
    parent = null;


    /**
     * @param name {string}
     */
    constructor(name) {
        this.name = name;
    }
}

class File extends FSElement {

    /**
     * @type number
     */
    size;

    /**
     *
     * @param size {number}
     * @param name {string}
     */
    constructor(size, name) {
        super(name);
        this.size = size;
    }
}

class Dir extends FSElement {
    /**
     * @type {Map<string, Element>}
     */
    content = new Map()

    /**
     * @param newElement {FSElement}
     */
    addElement(newElement) {
        this.content.set(newElement.name,newElement);
        newElement.parent = this;
    }
}

/**
 * @returns {Dir}
 */
const getRootFS = () => {
    const root = new Dir("/");
    root.parent = root;
    return root;
}
const formater = new Intl.NumberFormat("de-de");
/**
 * @param data {string[]};
 * @returns {Dir}
 */
const processData = (data) => {
    const fs = getRootFS();
    let current = fs;
    data.forEach(row => {
        const step = row.split(" ");
        if (step[0] == "$") {
            //command
            if (step[1] == "cd") {
                switch (step[2]) {
                    case "..":
                        current = current.parent;
                        break;
                    case "/":
                        current = fs;
                        break;
                    default:
                        current = current.content.get(step[2]);
                        break;
                }
            }
        } else {
            if (step[0]=="dir"){
                if (!current.content.has(step[1])) {
                    current.addElement(new Dir(step[1]));
                }
            }
            else{
                if (current.content.has(step[1])) {
                    console.warn('file overwrite');
                }
                current.addElement(new File(parseInt(step[0]),step[1]));
            }
        }
    })
    return fs;
}


/**
 * @param fs {FSElement}
 */
const printFS = (fs)=>{
    const printElement = (e,level=0,buffer=[])=>{
        const parts = [Array.from({length:level}).map(_=>" ").join(""),"-",e.name];
        if (e instanceof Dir){
            parts.push("(dir)")
            buffer.push(parts.join(" "));
            e.content.forEach(el=>printElement(el,level+1,buffer));
        }
        else{
            parts.push(`(file, size=${formater.format(e.size)} )`)
            buffer.push(parts.join(" "));
        }
        return buffer;
    }
    console.log(printElement(fs).join("\n"));
}

const data = stardata.split("\n");

const fs = processData(data);

printFS(fs);

/**
  * @type {Map<string, number>}
 */
const dirSizes = new Map();
/**
 * @param fs{Dir}
 */
const getSize = (fs,path=[])=>{
    const processing = [...path,fs.name];
    const name = processing.join("/");
    if (!dirSizes.has(name)){
        const sum = [...fs.content.values()].map(child=>child instanceof File?child.size:getSize(child,processing)).reduce(sumNumbers,0);
        dirSizes.set(name,sum);
    }
    return dirSizes.get(name);
}
getSize(fs);
console.log(dirSizes)

const result = [...dirSizes.values()].filter(x=>x<=100000).reduce(sumNumbers,0);

console.log("⭐ Find all of the directories with a total size of at most 100000. What is the sum of the total sizes of those directories?",result);

const total = 70000000;
const needed = 30000000;

const available = total-dirSizes.get("/");
const toBeDeletedMin = needed-available;

console.log (`total: ${formater.format(total)},needed:${formater.format(needed)},available:${formater.format(available)},toBeDeletedMin:${formater.format(toBeDeletedMin)}`);

const toBedeletedSize = [...dirSizes.values()].filter(x=>x>toBeDeletedMin).reduce((a,b)=>Math.min(a,b),dirSizes.get("/"));

console.log("⭐⭐ Find the smallest directory that, if deleted, would free up enough space on the filesystem to run the update. What is the total size of that directory?",toBedeletedSize);
