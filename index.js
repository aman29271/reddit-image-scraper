const { fetch_data } = require('./fetch-data');

const defaultOptions = {
  search: 'top',
  num: 100,
};

function main(options) {
  console.log(options);
  const { search, num } = Object.assign(defaultOptions, options);
  fetch_data(search, null, num)
    .then((after) => {
      console.log(after);
    })
    .catch((err) => console.log(err));
}

module.export = { reddit_scraper: main };
