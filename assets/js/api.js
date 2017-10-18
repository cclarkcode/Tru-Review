var proxyBase = "http://www.chrisstead.com/proxy/";
var chrisKey = "55d9430e09095b44d75ece0c0380c9daf1946332";

var gBase = "https://maps.googleapis.com/maps/api/";
var gCoordBase = "geocode/json?address=";
var gPlaceBase = "place/nearbysearch/json?location="

var gApiKey = "&key=AIzaSyDFJA-1O_YEj46FAJKk48WibUoT7YHdK1E";



function buildProxyUrl(remoteUrl) {
    return csProxyUtils.buildProxyUrl(chrisKey, remoteUrl)
}

var addressSearch = (address) => { 
    return gBase + gCoordBase + address + gApiKey; 
}

var detailSearch = (coords, name, keyword) => { 
    return gBase + gPlaceBase + coords.lat + "," + coords.lng + "&radius=50&keyword="+ keyword + gApiKey; 
}

var request = (options) => new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    
    xhr.open(options.method, options.url, true);

    xhr.onload = function() {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            resolve(xhr.response);
        } else {
            reject({
                status: this.status,
                statusText: xhr.statusText
            });
        }
    };

    xhr.onerror = function(){
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
    };

    if(options.headers)
        options.forEach( key => { xhr.setRequestHeader(key, options.headers[key])});

    xhr.send();
});

function paramsToString(params) {
    return Object.keys(params).map(key => ( 
        encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
    )).join('&');
}

var proxyOptions = (method, reqUrl) => ({
    method: method,
    url: buildProxyUrl(reqUrl)
});

var coordinates = (response) => {
    return {
        lat: response.results[0].geometry.location.lat,
        lng: response.results[0].geometry.location.lng
    };
}

var ratings = (response) => {

}

var location = (response) => {
    for(var i = 0; i < results.length; i++) {
        location.name === name;
    }
}

function opentableapi (restaurant, zip, callback) {

    //Returns through callback first restaurant in list searching by name and zip code

    //Query string
    var queryURL = "https://opentable.herokuapp.com/api/restaurants?name=" + restaurant + "&zip=" + zip;

    //API call
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {

      //Placeholder for information
      var info=response.restaurants[0];

      //Returns data here
      callback(info);
    
    });

  }

  function zomatoapi (restaurant, zip, callback) {

    //Returns through callback first restaurant in list searching by name and zip code

    //Query string
    var queryURL = "https://opentable.herokuapp.com/api/restaurants?name=" + restaurant + "&zip=" + zip;

    //API call
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {

      //Placeholder for information
      var info=response.restaurants[0];

      //Returns data here
      callback(info);
    
    });
}


//  https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=32.7937417,-117.2537803&radius=500&type=restaurant&keyword=cruise&key=AIzaSyDFJA-1O_YEj46FAJKk48WibUoT7YHdK1E