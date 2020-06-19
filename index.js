'use strict';
const chalk = require('chalk');

const { fetch_data } = require('./fetch-data');
const { end } = require('./progressBar');

function main(options) {
  const newOptions = parseOption(options);

  fetch_data(newOptions)
    .then(() => {
      // end();
      console.log(chalk.green('All images downloaded.'));
    })
    .catch((err) => console.log(err));
}

function parseOption(options) {
  let newOptions = {};
  const { search, subreddit, top, newest, limit } = options;
  if (search) {
    newOptions.search = search;
  }
  if (subreddit) {
    newOptions.subreddit = subreddit;
  }
  newOptions.limit = limit;

  if (search && subreddit) {
    console.info('Flag conflict found.');
    console.info('You should use either of the flag --subreddit, --search');
    process.exit(1);
  }
  if (top || newest) {
    if (top && newest) {
      console.info('Flag conflict found.');
      console.info('You should enter either one of --hot, --newest, --top flags.');
      console.info('using hot flag by default');
      newOptions.category = 'hot';
      return newOptions;
    }
    if (top) {
      newOptions.category = 'top';
    } else {
      newOptions.category = 'new';
    }
  } else {
    newOptions.category = 'hot';
  }
  return newOptions;
}
module.exports = main;
