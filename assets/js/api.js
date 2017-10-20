var proxyBase = "http://www.chrisstead.com/proxy/";
var chrisKey = "55d9430e09095b44d75ece0c0380c9daf1946332";

var gBase = "https://maps.googleapis.com/maps/api/";
var gCoordBase = "geocode/json?address=";
var gPlaceBase = "place/nearbysearch/json?location="
var gApiKey = "&key=AIzaSyDFJA-1O_YEj46FAJKk48WibUoT7YHdK1E";



var zomatoBase = "https://developers.zomato.com/api/v2.1/search?q=";
var yelpBase = "https://api.yelp.com/v3/businesses/search?term=";

var yelpAuthTokenUrl = "https://api.yelp.com/oauth2/token%0A?grant_type=client_credentials&client_id=800_1iRDDSx1mkxG680z6A&client_secret=ug0rVli4OnqYsHKgv8epYIBynvQZZlOmH3z3Luz5fddVfrXj4qE9Z8shxjlpRI7t";

function buildProxyUrl(remoteUrl) {
    return csProxyUtils.buildProxyUrl(chrisKey, remoteUrl);
}

function addressSearch(address) { 
    return gBase + gCoordBase + address + gApiKey; 
}

function googleDetailSearch(coords, name) {
    return gBase + gPlaceBase + coords.lat + "," + coords.lng + "&radius=50&keyword="+ name + gApiKey; 
}

function zomatoRestaurantSearch(coords, name) {
    var place = name.replace("+", "%20");
    return zomatoBase + place + "&lat=" + coords.lat + "&lon=" + coords.lng + "&radius=500&sort=real_distance&order=asc";
}

function yelpRestaurantSearch(coords, name) {
    var place = name.replace("+", "%20");

    var outputurl = yelpBase + place + "&latitude=" + coords.lat + "&longitude=" + coords.lng;
    console.log(outputurl);
    return outputurl;
}

function request(options) { 
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();    
        xhr.open(options.method, options.url, true);

        xhr.onload = function(){
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
        
        if(options.headers) {
            Object.keys(options.headers).forEach(function(key) {
                xhr.setRequestHeader(key, options.headers[key]);
            });
        }

        xhr.send();
    });
}

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
    var coords = JSON.parse(response);
    return {
        lat: coords.results[0].geometry.location.lat,
        lng: coords.results[0].geometry.location.lng
    };
}

function getRestaurant(name, response) {
    var places = JSON.parse(response).results;

    //If multiple places returned, find correct location within array, otherwise return only restaurant found
     if (places.length !== 1) {
        for(var i = 0; i < places.length; i++) {
            if(places[i].name.toUpperCase().includes(name.toUpperCase())) {
                return places[i];
            }
        }
    }
    else {return places[0];}

}

function getRestaurantExact(name, response) {
    var places = JSON.parse(response);

    //If multiple places returned, find correct location within array, otherwise return only restaurant found
     if (places.length !== 1) {
        for(var i = 0; i < places.length; i++) {
            if(places[i].name.toUpperCase() === name.toUpperCase()) {
                return places[i];
            }
        }
    }
    else {return places[0];}
}

//Use of Open Table deprecated because they don't actually provide reviews through API
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

