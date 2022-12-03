
export const sumNumbers = (a,b)=>a+b;

export const intersectSets = (a, b) => new Set([...a].filter(c => b.has(c)));