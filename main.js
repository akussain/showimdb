searchImdbMovie = function(title){
    var movieTitle = title.selectionText;
    var imdbId = getIMDbId(movieTitle);

    chrome.tabs.create({url: "http://www.imdb.com/title/" + imdbId});
};

chrome.contextMenus.create({
  title: "Show IMDb page",
  contexts:["selection"],
  onclick: searchImdbMovie
});

getIMDbId = function(title){
  var xhr = new XMLHttpRequest();

  var url = "http://www.omdbapi.com/?t=" + title + "&y=&plot=short&r=json";

  xhr.open("GET", url, false);
  xhr.send();

  var json = xhr.responseText,
      obj = JSON.parse(json);

  return obj.imdbID;
};