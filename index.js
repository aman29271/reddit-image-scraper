const { fetch_data } = require("./fetch-data");

function fetchAllData(query) {
  fetch_data(query)
    .then(after => {
      console.log(after);
    })
    .catch(err => console.log(err));
}
let sr = "allison parker";
fetchAllData(sr);
