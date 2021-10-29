const path = require("path");
const fs = require("fs");

let validFiles = ["main.js", "runtime.js", "polyfills.js", "styles.css"];

let jsCssFiles = [];

fs.readdirSync("./dist/").forEach((file) => {
  if (validFiles.indexOf(file) > -1) jsCssFiles.push(file);
});

let versionId = (new Date().getTime());

let filesToReplace = [];

jsCssFiles.forEach((file) => {
  let obj = { original: "", modified: "" };

  obj.original = file;

  let extension = path.extname(file);
  let newFileName = file.replace(extension, "");

  let hash = (Math.random() + 1).toString(36).substring(2);

  obj.modified = newFileName + "." + hash + extension;

  fs.renameSync(path.join(__dirname, 'dist/' + obj.original), obj.modified);

  obj.modified += "?version=" + versionId;

  filesToReplace.push(obj);
});

let indexContent = fs.readFileSync(path.join(__dirname, "/dist/index.html"), "utf8");
let newIndexPage = indexContent;

filesToReplace.forEach((file) => {
  newIndexPage = newIndexPage.replace(file.original, file.modified);
});

fs.writeFileSync("dist/index.html", newIndexPage, "utf8");