const axios = require("axios");
const fs = require("fs");
const { getIndivisualImage } = require("./getImage");
const chalk = require("chalk");

function fetch_data(query, after = null, num) {
  const postLimit = 100;
  let dir = `images/${query}`;
  let url;
  const baseURI = "https://www.reddit.com/search.json";
  const desktopURI = "https://gateway.reddit.com/desktopapi/v1/search";

  if (!fs.existsSync(dir)) {
    fs.mkdir(dir, { recursive: true }, err => {
      if (err) throw err;
    });
  }

  // after
  //   ? {((num >100) ? url = `https://www.reddit.com/search.json?q=${query}&after=${after}&limit=100`: url = `https://www.reddit.com/search.json?q=${query}&after=${after}&limit=${num})}
  //   : (num>100 ? url = `https://www.reddit.com/search.json?q=${query}&limit=100`:url);
  if (after) {
    if (num > postLimit) {
      url = `${baseURI}?q=${query}&after=${after}&limit=${postLimit}`;
    } else {
      url = `${baseURI}?q=${query}&after=${after}&limit=${num}`;
    }
  } else {
    if (num > postLimit) {
      url = `${baseURI}?q=${query}&limit=${postLimit}`;
    } else {
      url = `${baseURI}?q=${query}&limit=${num}`;
    }
  }
  if (num > 0) {
    return axios
      .get(url)
      .then(response => {
        const { data } = response.data;
        const {after,children} = data
        children.forEach(ele => {
          getIndivisualImage(ele.data.url, dir);
        });
        return fetch_data(query, after, num - postLimit);
      })
      .catch(error => {
        return null;
        console.log(error);
      });
  } else {
    console.log(chalk.green("All files downloaded."));
  }
}
module.exports = { fetch_data };
