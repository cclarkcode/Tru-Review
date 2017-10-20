$(document).ready(function() {

    $("#submit-button").on("click", function() { 
        var name = $("#name-input").val().trim();
        var address = $("#address-input").val().trim();
        
        if(!(address === null || address.match(/^ *$/) !== null)) {
            var frmtAddr = addressSearch(address);
            var frmtName = formatInput(name);
            var test = "http://localhost:8080/";
            // request({
            //     method: 'POST',
            //     url: test+yelpAuthUrl,
            //     headers: {
            //         "Access-Control-Allow-Headers": "*",
            //         "origin": "*",
            //         "grant_type": 'client_credentials',
            //         "client_id": '800_1iRDDSx1mkxG680z6A',
            //         "client_secret": 'ug0rVli4OnqYsHKgv8epYIBynvQZZlOmH3z3Luz5fddVfrXj4qE9Z8shxjlpRI7t'
            //        }
            // })  
            // .then(function(tokenResponse) {
            //     console.log(tokenResponse);
                
            // });
            
            request(
                proxyOptions('POST', buildProxyUrl(yelpAuthTokenUrl)
            ))
            .then(function(tokenResponse) {
                console.log(tokenResponse);
                
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
                console.log(zomatoPlace.restaurant.name);
                console.log("Zomato: " + formatReview(zomatoPlace.restaurant.user_rating.aggregate_rating));
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
                console.log(restraurantResponse.name);
                console.log("Google: " + formatReview(restraurantResponse.rating));
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