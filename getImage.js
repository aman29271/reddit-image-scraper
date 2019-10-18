const path = require("path");
const fs = require("fs");
const request = require("request");
const chalk = require("chalk");
// console.log(process.argv[2],'-->',process.argv[3]);

function getIndivisualImage(url, dir) {
  const fileName = path.basename(url);
  const regex = /https?:\/\/i\.redd\.it\/.*\.(jpg|png|gif)/;

  const relativeDir = path.join(dir, fileName);


  if (url.match(regex)) {
    if (fs.existsSync(relativeDir)) {
      console.log(fileName,chalk.yellow(" Already exist. Skipping..."));
    } else {
      request(url)
        .pipe(fs.createWriteStream(`${dir}/${fileName}`))
        .on("close", function() {
          console.log(url, chalk.green(" downloaded successfully."));
        });
    }
  }
}
// getIndivisualImage(process.argv[2])
module.exports = { getIndivisualImage };
