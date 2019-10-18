const path = require("path");
const fs = require("fs");
const request = require("request");
const chalk = require('chalk')
// console.log(process.argv[2],'-->',process.argv[3]);

function getIndivisualImage(url,dir) {
  const fileName = path.basename(url);
  const regex = /https?:\/\/i\.redd\.it\/.*\.(jpg|png|gif)/

  if (url.match(regex)) {
    request(url)
      .pipe(fs.createWriteStream(`${dir}/${fileName}`))
      .on("close", function() {
        console.log(url, chalk.green(' downloaded successfully.'));
      });
  }
}
// getIndivisualImage(process.argv[2])
module.exports = { getIndivisualImage };
