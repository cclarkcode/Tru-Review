var proxyBase = "http://www.chrisstead.com/proxy/";
var chrisKey = "55d9430e09095b44d75ece0c0380c9daf1946332";

var gBase = "https://maps.googleapis.com/maps/api/";
var gCoordBase = "geocode/json?";
var gApiKey = "AIzaSyDFJA-1O_YEj46FAJKk48WibUoT7YHdK1E";

function buildProxyUrl(remoteUrl) {
    return csProxyUtils.buildProxyUrl(chrisKey, remoteUrl)
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

function testResponse(response) {
    console.log(response);
    console.log(response.responseText);
}

var coordinates = (request) => {
    return {
        lat: request.results[0].geometry.location.lat,
        lng: request.results[0].geometry.location.lng
    };
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
