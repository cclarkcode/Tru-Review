var avgRating = 0;
var ratingCount = 0;

$(document).ready(function() {

    $("#submit-button").on("click", function() { 
        var name = $("#name-input").val().trim();
        var address = $("#address-input").val().trim();
        
        if(!(address === null || address.match(/^ *$/) !== null)) {
            var frmtAddr = addressSearch(address);
            var frmtName = formatInput(name);

            var yelpAuthToken;
            var ratings = [];

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

                    //set rating element here
                   
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

                    //set rating element here

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

                    //set rating element here
                    
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

function getGoogleRating(address, name) {
    return new Promise((resolve, reject) => {
        request(proxyOptions('GET', address))  
        .then(function (coordsResponse) {
            var coords = coordinates(coordsResponse);
            return request(proxyOptions('GET', googleDetailSearch(coords, name)));
        })
        .then(function (detailsResponse) {
            return getRestaurant(name, detailsResponse);
        })
        .then(function(restraurantResponse) {
            //restraurantResponse.rating > 0 ? review += 1 : review;
            console.log("Google Rating: " + formatReview(restraurantResponse.rating));
            resolve(formatReview(restraurantResponse.rating));
        });
    });
}

function addRatingScore(rating) {
    avgRating += rating;
    ratingCount++;
    console.log(avgRating/ratingCount);
}

// request(proxyOptions('POST', yelpAuthTokenUrl))
// .then(function(tokenResponse) {
//     yelpAuthToken = JSON.parse(tokenResponse).access_token;
// })
// .then(function(){
//     return request(proxyOptions('GET', frmtAddr));
// })
// .then(function(coordsResponse){
//     var coords = coordinates(coordsResponse);
//     return request({
//         method: 'GET',
//         url: buildProxyUrl(yelpRestaurantSearch(coords, frmtName)),
//         headers: {
//             "authorization": "Bearer " + yelpAuthToken
//            }
//     });
// })
// .then(function(yelpResponse) {
//     var yelpPlace = JSON.parse(yelpResponse).businesses[0];
//     yelpPlace.rating > 0 ? review += 1 : review;
//     console.log("Yelp Rating: " + formatReview(yelpPlace.rating));
// });

// request(proxyOptions('GET', frmtAddr))  
// .then(function (coordsResponse) {
//     var coords = coordinates(coordsResponse);
//     return request({
//         method: 'POST',
//         url: zomatoRestaurantSearch(coords, frmtName),
//         headers: {
//             "user-key": "f73f1e3b1f28a94ae801eb97cf84f822"
//            }
//     });
// })
// .then(function (detailsResponse) {
//     var zomatoPlace = JSON.parse(detailsResponse).restaurants[0];
//     zomatoPlace.restaurant.user_rating.aggregate_rating > 0 ? review += 1 : review;
//     console.log("Zomato Rating: " + formatReview(zomatoPlace.restaurant.user_rating.aggregate_rating));
// });

// request(proxyOptions('GET', frmtAddr))  
// .then(function (coordsResponse) {
//     var coords = coordinates(coordsResponse);
//     return request(proxyOptions('GET', googleDetailSearch(coords, frmtName)));
// })
// .then(function (detailsResponse) {
//     return getRestaurant(name, detailsResponse);
// })
// .then(function(restraurantResponse) {
//     //restraurantResponse.rating > 0 ? review += 1 : review;
//     console.log("Google Rating: " + formatReview(restraurantResponse.rating));
//     return formatReview(restraurantResponse.rating);
// });
