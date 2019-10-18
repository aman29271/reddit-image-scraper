const axios = require("axios");
const fs = require("fs");
const { getIndivisualImage } = require("./getImage");
const chalk = require('chalk')

function fetch_data(query, after = null, num) {
  let dir = `images/${query}`;
  let url;

  if (!fs.existsSync(dir)) {
    fs.mkdir(dir,{recursive:true}, err => {
      if (err) throw err;
    });
  }

  // after
  //   ? {((num >100) ? url = `https://www.reddit.com/search.json?q=${query}&after=${after}&limit=100`: url = `https://www.reddit.com/search.json?q=${query}&after=${after}&limit=${num})}
  //   : (num>100 ? url = `https://www.reddit.com/search.json?q=${query}&limit=100`:url);
  if (after) {
    if (num > 100) {
      url = `https://www.reddit.com/search.json?q=${query}&after=${after}&limit=100`;
    } else {
      url = `https://www.reddit.com/search.json?q=${query}&after=${after}&limit=${num}`;
    }
  } else {
    if (num > 100) {
      url = `https://www.reddit.com/search.json?q=${query}&limit=100`;
    } else {
      url = `https://www.reddit.com/search.json?q=${query}&limit=${num}`;
    }
  }
  if (num > 0) {
    return axios
      .get(url)
      .then(response => {
        after = response.data.data.after;
        response.data.data.children.forEach(ele => {
          // fs.writeFile("./data.txt", ele.data.url + "\n", { flag: "a" }, err => {
          //   if (err) {
          //     console.log(err);
          //   } else {
          //     console.log("writing file...");
          //   }
          // });
          getIndivisualImage(ele.data.url, dir);
        });
        return fetch_data(query, after, num - 100);
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
