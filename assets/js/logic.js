var name;
var address;
var dbAddr;
var ratingsobjectarray= [];
var yelptoken = "Bearer dlVH8b6SrxR8hB3Qt-kp8oNeaDzXSYP5O_pG7Gy6Sm5E7PxMa_6wbrpY88thyflQ3KVJ8xg6eAtGO_oEYRtC8c9oXBTVsCSbJGzV65ohKSdKhEIDxqvvZxGP5X_lWXYx";


$(document).ready(function() {

    run();


    //Store name globally to use after 2nd of 2 step search
    $("#name-submit").on("click", function() { 
     
        name = $("#name-input").val().trim();
        console.log(name)

    });

    //Store address and kick off page logic process
    $("#address-submit").on("click", function() {

        console.log(name);

        address = $("#address-input").val().trim();

        console.log(address);
        
        if(!(address === null || address.match(/^ *$/) !== null)) {
            
            var frmtAddr = addressSearch(address);
            var frmtName = formatInput(name);
            dbAddr = formatInput(address);

            //Begin API chain
            ratingsarray =[];
            yelpAPIcall(frmtName,frmtAddr,ratingsarray,zomatoAPIcall);
                   
            // zomatoAPIcall(frmtName,frmtAddr);
            // googleAPIcall(frmtName,frmtAddr);
            // dbfind(frmtName,dbAddr,callbacklog);
            // dbratingaverage(dbAddr);
        }
    });
});


//Function to make Zomato API Call
function zomatoAPIcall (frmtName,frmtAddr,ratingsarray,chain) {

    var zomatokey = "f73f1e3b1f28a94ae801eb97cf84f822";

    request(proxyOptions('GET', frmtAddr))  
            .then(function (coordsResponse) {
                var coords = coordinates(coordsResponse);
                return request({
                    method: 'POST',
                    url: zomatoRestaurantSearch(coords, frmtName),
                    headers: {
                        "user-key": zomatokey
                       }
                });
            })
            .then(function (detailsResponse) {
                var zomatoPlace = JSON.parse(detailsResponse).restaurants[0];
                if (zomatoPlace !== undefined) {
                    ratingsarray.push(zomatoPlace);
                    console.log(ratingsarray);
                    console.log("Zomato: " + formatReview(zomatoPlace.restaurant.user_rating.aggregate_rating));
                    chain(frmtName,frmtAddr,ratingsarray,dbfind)
                }
                else {
                    errorfunction();
                }

            });

}

//Function to make Google Places API call
function googleAPIcall (frmtName,frmtAddr,ratingsarray,chain) {

     request(proxyOptions('GET', frmtAddr))  
            .then(function (coordsResponse) {
                var coords = coordinates(coordsResponse);
                return request(proxyOptions('GET', googleDetailSearch(coords, frmtName)));
            })
            .then(function (detailsResponse) {
               
                return getRestaurant(frmtName, detailsResponse);
            })
            .then(function(restraurantResponse) {
                ratingsarray.push(restraurantResponse);
                console.log(ratingsarray);
                console.log("Google: " + formatReview(restraurantResponse.rating));
                chain(frmtName,frmtAddr,ratingsarray,runwhendone)
                
            });


}

//Function to make Yelp API call
function yelpAPIcall(frmtName,frmtAddr,ratingsarray,chain) {

var yelptoken = "Bearer dlVH8b6SrxR8hB3Qt-kp8oNeaDzXSYP5O_pG7Gy6Sm5E7PxMa_6wbrpY88thyflQ3KVJ8xg6eAtGO_oEYRtC8c9oXBTVsCSbJGzV65ohKSdKhEIDxqvvZxGP5X_lWXYx";
var chriskey = "55d9430e09095b44d75ece0c0380c9daf1946332";

   request(proxyOptions('GET', frmtAddr))  
            .then(function (coordsResponse) {
                var coords = coordinates(coordsResponse);
                if (coords !== undefined) {
                return request({
                    method: 'GET',
                    url: csProxyUtils.buildProxyUrl(chrisKey, yelpRestaurantSearch(coords, frmtName)),
                    headers: {
                        "authorization": yelptoken
                       }
                });
                } else {
                    errorfunction();
                }
            })
            .then(function (detailsResponse) {
                var yelpPlace = JSON.parse(detailsResponse).businesses[0];
                 // console.log(yelpPlace);
                 ratingsarray.push(yelpPlace);

                 //Calls next API function in the chain
                 chain(frmtName,frmtAddr,ratingsarray,googleAPIcall);
            });
}

//Function to remove or replace special characters which will cause issues in url string
function formatInput(field) {
    return field.replace(/ /g, '+')
                .replace('.', '+')
                .replace(/,/g, '+')
                .replace("'", "")
                .replace('#', "")
                .replace('-', "+")
                .split('++').join('+');
}

function formatReview(review) {
    return review === "0" ? "Tu Fue Reviews" : review;
}

//Test function that runs page logic without input
function run () {

            // //Test Case 1
            address = "809 Thomas Ave, San Diego, CA 92109"
            var frmtAddr = addressSearch(address);
            var frmtName = formatInput("The Local");
            dbAddr = formatInput(address);

            // Test Case 2
            // address ="8970 University Center Ln, San Diego, CA 92122";
            // var frmtAddr = addressSearch(address);
            // var frmtName = formatInput("Fleming's");
            // dbAddr = formatInput(address);
            

            //Make API calls
            yelpAPIcall(frmtName,frmtAddr,ratingsobjectarray,zomatoAPIcall);
            // .then(zomatoAPIcall(frmtName,frmtAddr))
            // .then(googleAPIcall(frmtName,frmtAddr))
            // .then(dbfind(frmtName,dbAddr,callbacklog))
            // .then(dbrating(dbAddr)); 
            // runwhendone(yelprating,zomatorating,googlerating,internalrating);
}

function callbacklog(snapshot) {

    console.log(snapshot);
}

$("#add-review").on("click", function() {

    var names = ["John", "Lindsay", "Jim", "Cade", "Jane"];
    var comments = ["This place sucks", "Nice Place!", "Good food, Bad service", "The best in the world", "Meh"];

    var name =names[Math.floor(Math.random()*5)];
    var comment = comments[Math.floor(Math.random()*5)];
    var rating = Math.floor(Math.random()*5)+1;

    console.log(dbAddr);
    reviewadd(dbAddr,name,comment,rating,dbratingaverage);

});

function runwhendone(ratingsarray) {

    console.log(ratingsarray);
}

function errorfunction () {

    console.log("Got to the error function");
    $("#myModal").toggle();
}