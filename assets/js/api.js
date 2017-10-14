var googleGeoBase = "https://maps.googleapis.com/maps/api/geocode/json?address=";
var googleApiKey = "&key=AIzaSyDFJA-1O_YEj46FAJKk48WibUoT7YHdK1E";

var chrisKey = "55d9430e09095b44d75ece0c0380c9daf1946332";

function googleAddressQueryString(address) {
    var queryString = googleGeoBase;
    var formattedAddress = "";

    var arr = [];

    Object.keys(address).forEach(function(key, i) {
       var words = address[key].split(' ');
       arr = arr.concat(words);
    });
    return queryString + arr.join('+') + googleApiKey;
}

function buildProxyUrl(remoteUrl) {
    return csProxyUtils.buildProxyUrl(chrisKey, remoteUrl)
}

function get(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            var result = xhr.responseText;
            callback(JSON.parse(result))
        }
    }
    xhr.open("GET", buildProxyUrl(url), true);
    xhr.send();
}

function getGoogleCoords(request) {
    return {
        lat: request.result.geometry.location.lat,
        lng: request.result.geometry.location.lat
    };
}