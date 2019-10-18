#!/usr/bin/env node
"use strict";
const meow = require("meow");
const { reddit_scraper } = require("./");

var cli = meow({
    help: [
      'Usage',
      '  reddit-scraper <search> <num>',
      '  reddit-scraper pics 200',
      '  reddit-scraper pics  5']
  });

let {search,num} = cli.input

reddit_scraper({ search, num });
