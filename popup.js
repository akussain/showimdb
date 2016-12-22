document.addEventListener('DOMContentLoaded', function() {
  var showIMDbPageButton = document.getElementById('showIMDbPage');
  showIMDbPageButton.addEventListener('click', function() {

    chrome.tabs.getSelected(null, function(tab) {
      showIMDbPage();
    });
  }, false);
}, false);

function showIMDbPage() {
    var movieTitle = encodeURIComponent(document.getElementById('title').value);
    var imdbId = getIMDbId(movieTitle);

    chrome.tabs.create({url: "http://www.imdb.com/title/" + imdbId});
}

getIMDbId = function(title){
  var xhr = new XMLHttpRequest();

  var url = "http://www.omdbapi.com/?t=" + title + "&y=&plot=short&r=json";

  xhr.open("GET", url, false);
  xhr.send();

  var json = xhr.responseText,
      obj = JSON.parse(json);

  return obj.imdbID;
};