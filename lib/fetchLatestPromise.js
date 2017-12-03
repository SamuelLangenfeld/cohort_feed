const blogParser = require("./blogParser.js");


const latest = (developer) => {
  return new Promise((resolve, reject) => {
    fetch(developer.blog)
      .then(function(response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response;
      })
      .then(function(stories) {
        stories.text().then(data => {
          //We want to pass each url to blogParser
          let updateObj = blogParser(developer.blog, data);
          developer["latest"] = updateObj.latest;
          developer["link"] = updateObj.link;
          resolve(developer);
        });
      });
  });
};


module.exports = latest;