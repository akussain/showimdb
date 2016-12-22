document.addEventListener('DOMContentLoaded', function() {
  var checkPageButton = document.getElementById('checkPage');
  checkPageButton.addEventListener('click', function() {

    chrome.tabs.getSelected(null, function(tab) {
      var xhr = new XMLHttpRequest();

      xhr.open("GET", "http://www.omdbapi.com/?t=Mark+%26+Russell%E2%80%99s+Wild+Ride&y=&plot=short&r=json", false);
      xhr.send();

      var result = xhr.responseText;
      var json = result,
          obj = JSON.parse(json);

      chrome.tabs.create({url: 'http://www.imdb.com/title/'+obj.imdbID})

    });
  }, false);
}, false);

searchImdbMovie = function(word){
    var movieTitle = word.selectionText;
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

  var url = getValidUrl("http://www.omdbapi.com/?t=" + title + "&y=&plot=short&r=json");

  xhr.open("GET", url, false);
  xhr.send();

  var json = xhr.responseText,
      obj = JSON.parse(json);

  return obj.imdbID;
};

getValidUrl = function(url){
  return url.replace(' ', '+');
}