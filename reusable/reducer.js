export const sumNumbers = (a, b) => a + b;
export const mulNumbers = (a, b) => a * b;
export const minNumber = (a, b) => Math.min(a, b);
export const maxNumber = (a, b) => Math.max(a, b);

export const intersectSets = (a, b) => new Set([...a].filter(c => b.has(c)));

export const getRowGrouper = (n) => (a, l, i) => {
    if (i % n == 0) {
        a.push([l]);
    } else {
        a[a.length - 1].push(l);
    }
    return a;
};