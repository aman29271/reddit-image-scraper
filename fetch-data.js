const axios = require("axios");
const fs = require("fs");

function fetch_data(query, after) {
  let url;
  after
    ? (url = `https://www.reddit.com/search.json?q=${query}&after=${after}`)
    : (url = `https://www.reddit.com/search.json?q=${query}`);
  return axios
    .get(url)
    .then(response => {
      after = response.data.data.after;
      response.data.data.children.forEach(ele => {
        fs.writeFile("./data.txt", ele.data.url + "\n", { flag: "a" }, err => {
          if (err) {
            console.log(err);
          } else {
            console.log("writing file...");
          }
        });
      });
      return fetch_data(query,after);
    })
    .catch(error => {
      return null;
      console.log(error);
    });
}
module.exports = { fetch_data };
