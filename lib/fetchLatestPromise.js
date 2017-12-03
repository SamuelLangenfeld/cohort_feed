const latest = (blog) => {
  return new Promise((req, res) => {
    fetch(blog)
      .then(function(response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response;
      })
      .then(function(stories) {
        stories.text().then(data => {
          //We want to pass each url to blogParser

          let blogInfo = blogParser(blog, data);
          resolve(blogInfo);
        });
      });

  });
};


module.exports = latest;