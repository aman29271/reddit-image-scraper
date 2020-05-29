#!/usr/bin/env node
'use strict';
const { Command } = require('commander');
const reddit_scraper = require('./index');

const program = new Command();

program
  .version('1.0.0', '-v, --version', 'Current version')
  .option('-f, --search <name>', ' Enter a name to search globally')
  .option('-s, --subreddit <subreddit>', ' Enter subreddit name to find')
  .option('-h, --hot', 'Search within Hot category')
  .option('-n, --newest', 'Search with New category')
  .option('-t, --top', ' Search within Top category')
  .option('-l, --limit <number>', 'No. of media to fetch', 25)
  .option('--help', 'display help for command');

program.parse(process.argv);

reddit_scraper(program.opts());
