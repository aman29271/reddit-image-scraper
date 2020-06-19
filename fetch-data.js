const axios = require('axios');
const fs = require('fs');
const { getIndivisualImage } = require('./getImage');
const path = require('path');

function fetch_data(options) {
  return new Promise((resolve, reject) => {
    let afterLocal;
    let { limit: num } = options;
    const query = options.search || options.subreddit;
    let dir = `images/${query}`;
    const postLimit = 25;
    const desktopURI = 'https://gateway.reddit.com/desktopapi/v1/search';

    const invokedFn = options.search ? search : subreddit;

    invokedFn();

    function search() {
      const baseURI = 'https://www.reddit.com/search.json';
      if (afterLocal) {
        let limit;
        num > postLimit ? (limit = postLimit) : (limit = num);
        url = `${baseURI}?q=${query}&after=${afterLocal}&limit=${limit}`;
      } else {
        num > postLimit ? (limit = postLimit) : (limit = num);
        url = `${baseURI}?q=${query}&limit=${limit}`;
      }

      commonFn(url);
    }

    function subreddit() {
      const { category } = options;
      const baseURI = 'https://www.reddit.com/r';
      if (afterLocal) {
        url = `${baseURI}/${query}/${category}.json?after=${afterLocal}`;
      } else {
        url = `${baseURI}/${query}/${category}.json`;
      }
      commonFn(url);
    }

    function commonFn(url) {
      if (!fs.existsSync(dir)) {
        fs.mkdir(path.resolve(__dirname, dir), { recursive: true }, (err) => {
          if (err) throw err;
        });
      }
      if (num > 0) {
        axios
          .get(url)
          .then((response) => {
            let promises = [];
            const { data } = response.data;
            const { after, children } = data;
            const parseChildArray = parseChild(children);
            parseChildArray.forEach((ele) => {
              promises.push(getIndivisualImage(ele.data.url, dir));
            });
            Promise.all(promises)
              .then(() => {
                afterLocal = after;
                num = num - children.length;
                invokedFn();
              })
              .catch((err) => reject(err));
          })
          .catch((error) => {
            reject(error);
            console.log(error);
          });
      } else {
        resolve();
      }
    }
  });
}

function parseChild(childArray) {
  return childArray.filter(
    (child) => child.data.is_video === false && extMatch(path.extname(child.data.url))
  );
  function extMatch(ext) {
    return ext === '.jpg' || ext === '.png' || ext === '.gif';
  }
}
module.exports = { fetch_data };
