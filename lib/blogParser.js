const parser = (blogURL, body) => {
  let latest;
  let link;
  if (blogURL.match(/medium\.com/)) {
    let placeholder = body.slice(body.indexOf("postPreview"));
    placeholder = placeholder.slice(placeholder.indexOf('readingTime'));
    placeholder = placeholder.slice(placeholder.indexOf('href='));
    if (placeholder.indexOf('<h3 name=') > -1) {
      link = placeholder.substring(placeholder.indexOf('"') + 1, placeholder.indexOf("data-action-source") - 2);
      placeholder = placeholder.slice(placeholder.indexOf('<h3 name='));
      latest = placeholder.substring(placeholder.indexOf('>') + 1, placeholder.indexOf('</h3'));
    }
  }

  if (blogURL.match(/wordpress\.com/)) {
    placeholder = body.slice(body.indexOf('class="entry-title'));
    placeholder = placeholder.slice(placeholder.indexOf(">"));
    link = placeholder.substring(placeholder.indexOf("h"), placeholder.indexOf('rel'));
    link = link.substring(6, link.length - 2);
    placeholder = placeholder.slice(placeholder.indexOf('>'));
    latest = placeholder.substring(placeholder.indexOf('">') + 2, placeholder.indexOf("</a"));
  }

  if (blogURL.match(/surge\.sh/)) {
    placeholder = body.slice(body.indexOf('class="post-link'));
    placeholder = placeholder.slice(placeholder.indexOf("f="));
    link = placeholder.substring(placeholder.indexOf('"') + 1, placeholder.indexOf('">'));
    latest = placeholder.substring(placeholder.indexOf('>') + 1, placeholder.indexOf("</a"));
    link = blogURL + link;
  }

  if (blogURL.match(/edwinyung\.com/)) {
    placeholder = body.slice(body.indexOf('entry-title'));
    placeholder = placeholder.slice(placeholder.indexOf("href="));
    link = placeholder.substring(placeholder.indexOf('"') + 1, placeholder.indexOf('" '));
    latest = placeholder.substring(placeholder.indexOf('>') + 1, placeholder.indexOf("</a"));
    link = blogURL + link;
  }

  if (latest && link) {
    latest = latest.replace("&nbsp;", " ");
    latest = latest.replace("&amp;", "&");
    link = link.trim();
    if (link.length < 1) {
      link = undefined;
    }
    latest = latest.trim();
  }
  return { latest, link };

}

module.exports = parser;