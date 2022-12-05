import {getRowGrouper} from "./reducer.js";

export const parseSpacePairs = (s)=>Object.fromEntries(s.split(" ").reduce(getRowGrouper(2),[]));
