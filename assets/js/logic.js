<<<<<<< HEAD
var yelpAuthToken;
var averageRating;
var reviews;
=======
>>>>>>> 02d1f110e1035af2cf6f4ca239cc83fda9373e6d

$(document).ready(function() {

    $("#submit-button").on("click", function() { 
        var name = $("#name-input").val().trim();
        var address = $("#address-input").val().trim();
        
        if(!(address === null || address.match(/^ *$/) !== null)) {
            var frmtAddr = addressSearch(address);
            var frmtName = formatInput(name);

            request(proxyOptions('POST', yelpAuthTokenUrl))
            .then(function(tokenResponse) {
                yelpAuthToken = JSON.parse(tokenResponse).access_token;
            })
            .then(function(){
                return request(proxyOptions('GET', frmtAddr));
            })
            .then(function(coordsResponse){
                var coords = coordinates(coordsResponse);
                return request({
                    method: 'GET',
                    url: buildProxyUrl(yelpRestaurantSearch(coords, frmtName)),
                    headers: {
                        "authorization": "Bearer " + yelpAuthToken
                       }
                });
            })
            .then(function(yelpResponse) {
                var yelpPlace = JSON.parse(yelpResponse).businesses[0];
                yelpPlace.rating > 0 ? review += 1 : review;
                console.log("Yelp Rating: " + formatReview(yelpPlace.rating));
            });

            request(proxyOptions('GET', frmtAddr))  
            .then(function (coordsResponse) {
                var coords = coordinates(coordsResponse);
                return request({
                    method: 'POST',
                    url: zomatoRestaurantSearch(coords, frmtName),
                    headers: {
                        "user-key": "f73f1e3b1f28a94ae801eb97cf84f822"
                       }
                });
            })
            .then(function (detailsResponse) {
                var zomatoPlace = JSON.parse(detailsResponse).restaurants[0];
                zomatoPlace.restaurant.user_rating.aggregate_rating > 0 ? review += 1 : review;
                console.log("Zomato Rating: " + formatReview(zomatoPlace.restaurant.user_rating.aggregate_rating));
            });

            request(proxyOptions('GET', frmtAddr))  
            .then(function (coordsResponse) {
                var coords = coordinates(coordsResponse);
                return request(proxyOptions('GET', googleDetailSearch(coords, frmtName)));
            })
            .then(function (detailsResponse) {
                return getRestaurant(name, detailsResponse);
            })
            .then(function(restraurantResponse) {
                restraurantResponse.rating > 0 ? review += 1 : review;
                console.log("Google Rating: " + formatReview(restraurantResponse.rating));
            });
        }
    });
});

function formatInput(field) {
    return field.replace(' ', '+')
                .replace('.', '+')
                .replace(',', '+');
}

function formatReview(review) {
    return review === "0" ? "Tu Fue Reviews" : review;
}
