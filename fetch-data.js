const axios = require("axios");
const fs = require("fs");
const { getIndivisualImage } = require("./getImage");
const chalk = require("chalk");

function fetch_data(query, after = null, num) {
  let dir = `images/${query}`;
  const postLimit = 25;
  const desktopURI = "https://gateway.reddit.com/desktopapi/v1/search";

  function search() {
    const baseURI = "https://www.reddit.com/search.json";
    if (after) {
      let limit;
      num > postLimit ? (limit = postLimit) : (limit = num);
      url = `${baseURI}?q=${query}&after=${after}&limit=${limit}`;
    } else {
      num > postLimit ? (limit = postLimit) : (limit = num);
      url = `${baseURI}?q=${query}&limit=${limit}`;
    }

    commonFn(url);
  }

  function subreddit() {
    const baseURI = "https://www.reddit.com/r";
    if (after) {
      url = `${baseURI}/${query}/hot.json?after=${after}`;
    } else {
      url = `${baseURI}/${query}/hot.json`;
    }
    commonFn(url);
  }

  function commonFn(url) {
    let url;
    if (!fs.existsSync(dir)) {
      fs.mkdir(dir, { recursive: true }, (err) => {
        if (err) throw err;
      });
    }
    if (num > 0) {
      return axios
        .get(url)
        .then((response) => {
          const { data } = response.data;
          const { after, children } = data;
          children.forEach((ele) => {
            getIndivisualImage(ele.data.url, dir);
          });
          return fetch_data(query, after, num - postLimit);
        })
        .catch((error) => {
          return null;
          console.log(error);
        });
    } else {
      console.log(chalk.green("All files downloaded."));
    }
  }
}
module.exports = { fetch_data };
