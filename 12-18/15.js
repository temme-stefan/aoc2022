import {example, stardata} from "./15-data.js";
import {sumNumbers} from "../reusable/reducer.js";

const isIn = (x, a) => a[0] <= x && x <= a[1];

const intersects = (a1, a2) => isIn(a1[0], a2) || isIn(a2[0], a1);

const isAdjacent = (a1, a2) => Math.min(a1[1], a2[1]) + 1 == Math.max(a1[0], a2[0]);


const union = (a1, a2) => {
    const left1InA2 = isIn(a1[0], a2);
    const right1InA2 = isIn(a1[1], a2);
    const left2InA1 = isIn(a2[0], a1);
    const right2InA1 = isIn(a2[1], a1);
    switch (true) {
        case left1InA2 && right1InA2:
            return [a2];
        case left2InA1 && !right2InA1:
        case !left1InA2 && right1InA2:
            return [[a1[0], a2[1]]];
        case !left2InA1 && right2InA1:
        case left1InA2 && !right1InA2:
            return [[a2[0], a1[1]]]
        case left2InA1 && right2InA1:
            return [a1];
        default:
            if (isAdjacent(a1, a2)) {
                return [Math.min(a1[0], a2[0]), Math.max(a1[1], a2[1])];
            }
            return [a1, a2]
    }
}

const intersection = (a1, a2) => {
    const left1InA2 = isIn(a1[0], a2);
    const right1InA2 = isIn(a1[1], a2);
    const left2InA1 = isIn(a2[0], a1);
    const right2InA1 = isIn(a2[1], a1);
    switch (true) {
        case left1InA2 && right1InA2:
            return a1;
        case left2InA1 && !right2InA1:
        case !left1InA2 && right1InA2:
            return [a2[0], a1[1]];
        case !left2InA1 && right2InA1:
        case left1InA2 && !right1InA2:
            return [a1[0], a2[1]];
        case left2InA1 && right2InA1:
            return a2;
        default:
            return []
    }
}

const shrink = (bunchOfA) => {
    let shrinked = [];
    for (let i = 0; i < bunchOfA.length; i++) {
        let current = bunchOfA[i];
        const next = [];
        shrinked.forEach(a => {
            if (intersects(a, current) || isAdjacent(a, current)) {
                current = union(current, a).flat();
            } else {
                next.push(a);
            }
        });
        next.push(current);
        shrinked = next;
    }
    return shrinked;
}


class SensorBeaconPair {
    #sensor = [0, 0];
    #beacon = [0, 0];
    #distance = 0;

    constructor(sensor, beacon) {
        this.#sensor = sensor;
        this.#beacon = beacon;
        this.#distance = Math.abs(sensor[0] - beacon[0]) + Math.abs(sensor[1] - beacon[1]);
    }

    getIntervallAtRow(row) {
        const delta = Math.abs(this.#sensor[1] - row);
        const intervall = [];
        if (delta <= this.#distance) {
            intervall.push(this.#sensor[0] - (this.#distance - delta));
            intervall.push(this.#sensor[0] + (this.#distance - delta));
        }

        return intervall;
    }

    getBeacon() {
        return [...this.#beacon];
    }

    toString() {
        return `Sensor:[${this.#sensor.join(",")}] Beacon:[${this.#beacon.join(",")}] Distance:${this.#distance}`
    }
}

const parse = (data) => {
    const pattern = /Sensor at x=(-?\d+), y=(-?\d+): closest beacon is at x=(-?\d+), y=(-?\d+)/g
    let row;
    const sensorBeaconPairs = [];
    while (row = pattern.exec(data)) {
        const [, sx, sy, bx, by] = row.map(x => parseInt(x));
        sensorBeaconPairs.push(new SensorBeaconPair([sx, sy], [bx, by]));
    }
    return sensorBeaconPairs;
}

const data = stardata;
const exampleTarget = 10;
const starTarget = 2_000_000;

const target = data == example ? exampleTarget : starTarget;


const sensorBeaconPairs = parse(data);

const noBeaconAt = sensorBeaconPairs.map(p => p.getIntervallAtRow(target))
    .filter(a => a.length)
    .reduce((a, b) => shrink([...a, b]), []).map(a => a[1] - a[0] + 1).reduce(sumNumbers)
const beaconAt = new Set(sensorBeaconPairs.map(p => p.getBeacon()).filter(b => b[1] == target).map(b => b[0])).size;


console.log("⭐ Consult the report from the sensors you just deployed. In the row where y=2000000, how many positions cannot contain a beacon?", noBeaconAt - beaconAt);

const tuningFrequenz = (a) => a[0] * 4_000_000 + a[1];
const borders = [0, data == example ? 20 : 4_000_000];

let result = null;
for (let i = borders[0]; result == null && i <= borders[1]; i++) {
    const blocked = sensorBeaconPairs.map(p => intersection(p.getIntervallAtRow(i), borders))
        .filter(a => a.length)
        .reduce((a, b) => shrink([...a, b]), []);
    if (blocked.length == 2) {
        console.log(i, blocked)
        result = tuningFrequenz([1 + Math.min(blocked[0][1], blocked[1][1]), i]);
    }
}


console.log("⭐⭐ Find the only possible position for the distress beacon. What is its tuning frequency?", result);
