import process from 'node:process';
import path from 'node:path';
import {copyFile,readFile,writeFile} from 'node:fs/promises';
import {constants} from 'node:fs';

const myArgs = process.argv.slice(2);
let day;
if (myArgs.length == 0) {
    day = new Date().getDate();
} else {
    day = parseInt(myArgs[0]);
}
const padLeft = (day) => (day < 10 ? "0" : "") + day;
const folderNumber = Math.floor((day + 2) / 7);
const firstSunday = 4;
const endOfWeek = Math.min(25, folderNumber * 7 + firstSunday);
const startOfWeek = Math.max(1, folderNumber * 7 + firstSunday - 6);

const folder = path.join('.', `${padLeft(startOfWeek)}-${padLeft(endOfWeek)}`)
const filenames = [`${padLeft(day)}.js`, `${padLeft(day)}-data.js`].map(f => path.join(folder, f));
const sources = ['template.js','template-data.js'].map(f=>path.join('.','scripts','template',f))

const replacer = /template/g;

Promise.all(filenames.map((p,i)=>copyFile(sources[i],p,constants.COPYFILE_EXCL)))
    .then(()=> {
        console.log(`${filenames.length} files copied`);
        Promise.all(filenames.map(f=>readFile(f,'utf8').then(content=>writeFile(f,content.replace(replacer,padLeft(day)),'utf8')) ))
            .then(()=>console.log(`${filenames.length} files modified`))
            .catch(e=>console.error(e));
    })
    .catch(e=>console.error(e));