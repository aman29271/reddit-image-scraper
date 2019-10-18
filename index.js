const { fetch_data } = require("./fetch-data");

const defaultOptions = {
  search:"top",
  num :100
}

function fetchAllData(options) {
  const {search,num} = Object.assign(defaultOptions,options)
  fetch_data(search,null,num)
    .then(after => {
      console.log(after);
    })
    .catch(err => console.log(err));
}

fetchAllData({search:process.argv[2],num:process.argv[3]});
// module.export = {reddit_scraper:fetchAllData}