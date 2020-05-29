const path = require('path');
const fs = require('fs');
const request = require('request');
const chalk = require('chalk');

function getIndivisualImage(url, dir) {
  return new Promise((resolve, reject) => {
    const fileName = path.basename(url);
    const regex = /https?:\/\/.*\.(jpg|png|gif)/;

    const relativeDir = path.join(__dirname, dir, fileName);

    if (url.match(regex)) {
      if (fs.existsSync(relativeDir)) {
        resolve();
        console.log(fileName, chalk.yellow(' Already exist. Skipping...'));
      } else {
        request(url)
          .pipe(fs.createWriteStream(`${dir}/${fileName}`))
          .on('finish', function () {
            resolve();
            console.log(url, chalk.green(' downloaded successfully.'));
          })
          .on('error', (err) => {
            reject(err);
          });
      }
    } else {
      resolve();
      console.log(chalk.red(url, ' Unknown file format.'));
    }
  });
}
module.exports = { getIndivisualImage };
