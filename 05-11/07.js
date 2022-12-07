import {example, stardata} from "./07-data.js";
import {minNumber, sumNumbers} from "../reusable/reducer.js";


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

    toString(){
        return this.name;
    }
}

class File extends FSElement {
    static formatter = new Intl.NumberFormat("de-de");

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

    toString() {
        return `${super.toString()} (file, size=${File.formatter.format(this.size)})`;
    }
}

class Dir extends FSElement {
    /**
     * @type {Map<string, FSElement>}
     */
    content = new Map()

    /**
     * @param newElement {FSElement}
     */
    addElement(newElement) {
        this.content.set(newElement.name, newElement);
        newElement.parent = this;
    }

    toString() {
        return `${super.toString()} (dir)`;
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

/**
 * @param data {string[]};
 * @returns {Dir}
 */
const processData = (data,fs) => {
    let current = fs;
    data.forEach(row => {
        const step = row.split(" ");
        if (step[0] === "$") {
            //command
            if (step[1] === "cd") {
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
            if (step[0] === "dir") {
                if (!current.content.has(step[1])) {
                    current.addElement(new Dir(step[1]));
                }
            } else {
                current.addElement(new File(parseInt(step[0]), step[1]));
            }
        }
    })
}


/**
 * @param fs {FSElement}
 */
const printFS = (fs) => {
    const printElement = (e, level = 0, buffer = []) => {
        const parts = [Array.from({length: level}).map(_ => " ").join(""), "-", e.toString()];
        buffer.push(parts.join(" "));
        if (e instanceof Dir) {
            e.content.forEach(el => printElement(el, level + 1, buffer));
        }
        return buffer;
    }
    console.log(printElement(fs).join("\n"));
}

const data = stardata.split("\n");

const fs = getRootFS();

processData(data,fs);

printFS(fs);

/**
 * @type {Map<string, number>}
 */
const dirSizes = new Map();
/**
 * @param fs{FSElement}
 * @param path {string[]}
 * @return {number}
 */
const getSize = (fs, path = []) => {
    if (fs instanceof File) {
        return fs.size;
    }
    if (fs instanceof Dir) {
        const processing = [...path, fs.name];
        const name = processing.join("/");
        if (!dirSizes.has(name)) {
            const sum = [...fs.content.values()].map(child => getSize(child, processing)).reduce(sumNumbers, 0);
            dirSizes.set(name, sum);
        }
        return dirSizes.get(name);
    }
}
getSize(fs);

const result = [...dirSizes.values()].filter(x => x <= 100000).reduce(sumNumbers, 0);

console.log("⭐ Find all of the directories with a total size of at most 100000. What is the sum of the total sizes of those directories?", result);

const total = 70000000;
const needed = 30000000;

const available = total - dirSizes.get("/");
const toBeDeletedMin = needed - available;


const toBeDeletedSize = [...dirSizes.values()].filter(x => x > toBeDeletedMin).reduce(minNumber, dirSizes.get("/"));

console.log("⭐⭐ Find the smallest directory that, if deleted, would free up enough space on the filesystem to run the update. What is the total size of that directory?", toBeDeletedSize);
