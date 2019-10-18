const fs = require("fs");

fs.readFile("./data.json", "utf8", (err, data) => {
  if (err) throw err;
  data = JSON.parse(data);
  const { posts, postOrder } = data;
  const filteredPost = postOrder.filter(post => {
    if (posts[post].media) {
      return post;
    }
  });
  const newPostOrder = filteredPost.map(ele => {
    //   if(posts[ele].media.prototype.hasOwnProperty('content')){
    var newObject = {};
    newObject.name = ele;
    newObject.media = posts[ele].media;
    return newObject;
    //   }
  });
  newPostOrder.forEach(ele => {
    getIndivisualImage(ele.media.content, dir);
  });

  //   console.log(newPostOrder);
});
