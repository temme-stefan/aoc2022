import {example, stardata} from "./21-data.js";

function parse(data) {
    const tree = new Map();
    const valueCache = new Map();
    const valuetest = /^([a-z]{4}): (\d+)$/
    const operationTest = /^([a-z]{4}): ([a-z]{4}) ([\\+-\\*\/]) ([a-z]{4})$/
    const operation = new Map([["+", (a, b) => a + b], ["-", (a, b) => a - b], ["*", (a, b) => a * b], ["/", (a, b) => a / b]]);
    data.split("\n").forEach(r => {
        let match;
        if (match = valuetest.exec(r)) {
            const value = parseInt(match[2]);
            valueCache.set(match[1], value);
            tree.set(match[1], () => value);
        } else if (match = operationTest.exec(r)) {
            tree.set(match[1], () => {
                if (!valueCache.has(match[1])) {
                    valueCache.set(match[1], operation.get(match[3])(tree.get(match[2])(), tree.get(match[4])()));
                }
                else{
                    console.log("cacheHIt")
                }
                return valueCache.get(match[1]);
            })
        }
    })
    return tree;
}

function parse2(data) {
    const tree = new Map();
    const valueCache = new Map();
    const valuetest = /^([a-z]{4}): (\d+)$/
    const operationTest = /^([a-z]{4}): ([a-z]{4}) ([\\+-\\*\/]) ([a-z]{4})$/
    const operation = new Map([
        ["+", (a, b) => [a[0] + b[0], a[1] + b[1]]],
        ["-", (a, b) => [a[0] - b[0], a[1] - b[1]]],
        ["*", (a, b) => {
            if (a[1] != 0 && b[1] != 0) {
                console.warn("TODO handle Square", a, b);
                return a;
            } else {
                return [a[0] * b[0], a[1] * b[0] + a[0] * b[1]];
            }
        }],
        ["/", (a, b) => {
            if (b[1] != 0) {
                console.warn("TODO handle Division by X", a, b);
                return a;
            } else {
                return [a[0] / b[0], a[1] / b[0]];
            }
        }]]);
    data.split("\n").forEach(r => {
        let match;
        if (r.startsWith("root")) {
            tree.set("root", () => {
                match = operationTest.exec(r);
                const a = tree.get(match[2])(), b = tree.get(match[4])();
                console.log(a, b);
                return (b[0] - a[0]) / (a[1] - b[1]);
            })
        } else if (r.startsWith("humn")) {
            const value = [0, 1];
            valueCache.set("humn", value);
            tree.set("humn", () => value);
        } else if (match = valuetest.exec(r)) {
            const value = [parseInt(match[2]), 0];
            valueCache.set(match[1], value);
            tree.set(match[1], () => value);
        } else if (match = operationTest.exec(r)) {
            tree.set(match[1], () => {
                if (!valueCache.has(match[1])) {
                    valueCache.set(match[1], operation.get(match[3])(tree.get(match[2])(), tree.get(match[4])()));
                }
                return valueCache.get(match[1]);
            })
        }
    })
    return tree;
}

const data = stardata;
const treeMap = parse(data);

console.log("⭐ However, your actual situation involves considerably more monkeys. What number will the monkey named root yell?", treeMap.get("root")());


const tree2 = parse2(data);

console.log("⭐⭐ What number do you yell to pass root's equality test?", tree2.get("root")());
