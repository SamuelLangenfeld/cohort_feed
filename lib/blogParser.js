const parser = (blogURL, body) => {
  let title;
  let link;
  if (blogURL.match(/medium\.com/)) {
    let placeholder = body.slice(body.indexOf("postPreview"));
    placeholder = placeholder.slice(placeholder.indexOf('readingTime'));
    placeholder = placeholder.slice(placeholder.indexOf('href='));
    link = placeholder.substring(placeholder.indexOf('"') + 1, placeholder.indexOf("data-action-source") - 2);
    placeholder = placeholder.slice(placeholder.indexOf('<h3'));
    title = placeholder.substring(placeholder.indexOf('>') + 1, placeholder.indexOf('</h3'));

  }

  if (blogURL.match(/wordpress\.com/)) {
    placeholder = body.slice(body.indexOf('class="entry-title'));
    placeholder = placeholder.slice(placeholder.indexOf(">"));
    link = placeholder.substring(placeholder.indexOf("h"), placeholder.indexOf('rel'));
    link = link.substring(6, link.length - 2);
    placeholder = placeholder.slice(placeholder.indexOf('>'));
    title = placeholder.substring(placeholder.indexOf('">') + 2, placeholder.indexOf("</a"));
    title = title.replace("&nbsp;", " ");
  }

  if (blogURL.match(/surge\.sh/)) {
    placeholder = body.slice(body.indexOf('class="post-link'));
    placeholder = placeholder.slice(placeholder.indexOf("f="));
    link = placeholder.substring(placeholder.indexOf('"') + 1, placeholder.indexOf('">'));
    title = placeholder.substring(placeholder.indexOf('>') + 1, placeholder.indexOf("</a"));
    link = blogURL + link;
  }

  if (title && link) {
    link = link.trim();
    title = title.trim();
    return { title, link };
  } else {
    return undefined;
  }

}

module.exports = parser;