var avgRating = 0;
var ratingCount = 0;
var frmtName;
var frmtAddr;

$(document).ready(function() {
    $("#name-submit").on("click", function() { 
        var name = $("#name-search").val().trim();
        if(!(name === null || name.match(/^ *$/) !== null)) {
            frmtName = formatInput(name);
        }
    });

    $("#address-submit").on("click", function() {
        if(!(address === null || address.match(/^ *$/) !== null)) {
            var address = $("#address-input").val().trim();
            frmtAddr = addressSearch(address);

            var yelpAuthToken;

            request(proxyOptions('POST', yelpAuthTokenUrl))
            .then(function(tokenResponse) {
                yelpAuthToken = JSON.parse(tokenResponse).access_token;
            })
            .then(function(){
                return request(proxyOptions('GET', frmtAddr));
            })
            .then(function(coordsResponse){
                var coords = coordinates(coordsResponse);
                
                request({
                    method: 'GET',
                    url: buildProxyUrl(yelpRestaurantSearch(coords, frmtName)),
                    headers: {
                        "authorization": "Bearer " + yelpAuthToken
                       }
                }) 
                .then(function(yelpResponse) {
                    var yelpPlace = JSON.parse(yelpResponse).businesses[0];
                    var rating = formatReview(yelpPlace.rating);

                    if(!isNaN(rating)) {
                        console.log(isNaN(rating));
                        addRatingScore(rating);
                    }

                    // UI/DB LOGIC HERE
                   
                    console.log("Yelp Rating: " + formatReview(yelpPlace.rating));
                });

                request({
                    method: 'POST',
                    url: zomatoRestaurantSearch(coords, frmtName),
                    headers: {  
                        "user-key": "f73f1e3b1f28a94ae801eb97cf84f822"
                       }
                })
                .then(function (detailsResponse) {
                    var zomatoPlace = JSON.parse(detailsResponse).restaurants[0];
                    var rating = formatReview(zomatoPlace.restaurant.user_rating.aggregate_rating);
                    
                    if(!isNaN(rating)) {
                        console.log(isNaN(rating));
                        addRatingScore(rating);
                    }

                    // UI/DB LOGIC HERE

                    console.log("Zomato Rating: " + formatReview(rating));
                });

                request(proxyOptions('GET', googleDetailSearch(coords, frmtName)))
                .then(function (detailsResponse) {
                    return getRestaurant(name, detailsResponse);
                })
                .then(function(restraurantResponse) {
                    var rating = formatReview(restraurantResponse.rating);
                    
                    if(!isNaN(rating)) {
                        console.log(isNaN(rating));
                        addRatingScore(rating);
                    }

                    // UI/DB LOGIC HERE
                    
                    console.log("Google Rating: " + formatReview(rating));
                });
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

function addRatingScore(rating) {
    avgRating += rating;
    ratingCount++;
    //DISPLAY AND UPDATE AVERAGE RATING
}