const path = require('path');
const fs = require('fs');
const request = require('request');
const chalk = require('chalk');
const events = require('events');

const { emit: emitDataEvent } = require('./progressBar');
const PartialDownload = new events.EventEmitter();

function getIndivisualImage(url, dir) {
  return new Promise((resolve, reject) => {
    const fileName = path.basename(url);
    PartialDownload.once('partial_download', unfinishedDownloadHandler);
    const relativeDir = path.join(__dirname, dir, fileName);

    if (fs.existsSync(relativeDir)) {
      resolve();
      // emitDataEvent();
      console.log(fileName, chalk.yellow(' Already exist. Skipping...'));
    } else {
      request(url)
        .pipe(fs.createWriteStream(`${dir}/${fileName}`))
        .on('finish', function () {
          resolve();
          // emitDataEvent();
          console.log(url, chalk.green(' downloaded successfully.'));
        })
        .on('error', (err) => {
          reject(err);
          fs.unlink(path.join(__dirname, dir, fileName), (err) => {
            if (err) throw err;
            PartialDownload.emit('partial_download');
          });
        });
    }
  });
}

function unfinishedDownloadHandler() {
  console.log('cleaning up unfinished downloads...');
}
module.exports = { getIndivisualImage };
