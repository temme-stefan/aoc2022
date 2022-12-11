import {example, stardata} from "./11-data.js";
import {mulNumbers} from "../reusable/reducer.js";


const getMonkeys = (data) => {
    const parser = /Monkey (\d+):\s*Starting items: ((\d+(, )?)+)\s*Operation: new = (old|\d+) (\*|\+) (old|\d+)\s*Test: divisible by (\d+)\s*If true: throw to monkey (\d+)\s*If false: throw to monkey (\d+)/g
    const monkeys = new Map();
    let current;
    while (current = parser.exec(data)) {
        const [, key, itemlist, , , arg1, operator, arg2, divisor, trueTarget, falseTarget] = current;
        const a = parseInt(arg1);
        const b = parseInt(arg2);
        const div = parseInt(divisor);
        monkeys.set(key, {
            items: itemlist.split(", ").map(s => parseInt(s)),
            changeWorry: (x) => {
                const a1 = Number.isNaN(a) ? x : a;
                const b1 = Number.isNaN(b) ? x : b;
                return operator == "+" ? a1 + b1 : a1 * b1;
            },
            moveToTarget: (x) => {
                return x % div == 0 ? trueTarget : falseTarget;
            },
            inspections:0
        })
    }
    return monkeys;
}

const data = stardata;

const monkeys = getMonkeys(data);
const rounds = 20;
const activeCount = 2;

const playRound = (monkeys)=>{
    const relief = x=>(x-x%3)/3;
    [...monkeys.values()].forEach((monkey)=>{
        while (monkey.items.length>0) {
            const currentWL = monkey.items.shift()
            const nextWL = relief(monkey.changeWorry(currentWL));
            const target =monkey. moveToTarget(nextWL);
            monkeys.get(target).items.push(nextWL);
            monkey.inspections++;
        }
    })
}
for (let i=0;i<rounds;i++) {
    playRound(monkeys);
}
const monkeyBusiness =  [...monkeys.values()].reduce((a,m)=>{
    a.push(m);
    a.sort((a,b)=>Math.sign(b.inspections-a.inspections));
    a.length=activeCount;
    return a;
},[]).map(m=>m.inspections).reduce(mulNumbers,1);

console.log("⭐ Figure out which monkeys to chase by counting how many items they inspect over 20 rounds. What is the level of monkey business after 20 rounds of stuff-slinging simian shenanigans?", monkeyBusiness);

console.log("⭐⭐ ");

