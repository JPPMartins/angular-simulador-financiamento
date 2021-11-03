const path = require('path');
const fs = require('fs');

let validFiles = ['main.js', 'runtime.js', 'polyfills.js', 'scripts.js', 'styles.css'];

let jsCssFiles = [];

const distDir = path.join(__dirname, '/dist/');

fs.readdirSync(distDir).forEach((file) => {
  if (validFiles.indexOf(file) > -1) jsCssFiles.push(file);
});

let versionId = new Date().getTime();

let filesToReplace = [];

jsCssFiles.forEach((file) => {
  let obj = { 
    original: '', 
    modified: '' 
  };

  obj.original = file;

  let extension = path.extname(file);
  let newFileName = file.replace(extension, '');

  let hash = (Math.random() + 1).toString(36).substring(2);

  obj.modified = newFileName + '.' + hash + extension;

  fs.renameSync(distDir + obj.original, distDir + obj.modified);

  obj.modified += '?version=' + versionId;

  filesToReplace.push(obj);
});

let indexContent = fs.readFileSync(distDir + 'index.html', 'utf8');
let newIndexPage = indexContent;

filesToReplace.forEach((file) => {
  newIndexPage = newIndexPage.replace(file.original, file.modified);
});

fs.writeFileSync(distDir + 'index.html', newIndexPage, 'utf8');