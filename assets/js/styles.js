// User inputs
var name = '';
var address = '';

//Individual ratings
var trureviewRating = 0;
var googleRating = 4;
var zomatoRating = 5;
var yelpRating = 3;

//Combined rating
var combinedRating = 4;

// Nice to have
var latCoordinates = '';
var longCordinates = '';


function getAverageRating(trureviewRating, googleRating, zomatoRating, yelpRating) {
    var ratings = [trureviewRating, googleRating, zomatoRating, yelpRating];
    var average = 0;
    var divider = 0;
    for (var i = 0; i < ratings.length; i++) {
        if (parseFloat(ratings[i]) !== 0){
            average += parseFloat(ratings[i]);
            divider++;
        }
    }
    console.log(average);
    console.log(divider);
    if (average === 0) {
        return average;
    } else {
        return (average/divider).toFixed(1);
    }
}

// Takes array of st
function colorStars(rating, starArray) {
    for (var i = 0; i < rating; i++) {
        $(starArray[i]).css({
            'color' : 'orange',
            'cursor' : 'pointer'
        });
    }
}


// Kick off when API call is finished
function searchComplete(yelp,zomato,google,internal) {
    $('#results').delay(400).fadeIn(600);
    $('#logo').css({
        'width': '30%',
        'height': '30%',
        'margin-left': '35%'
    });
    $('#mascot').css({
        'width': '15%',
        'height': '15%',
        'margin-left': '42%'
    });
    // Add numeric labels with ratings

    var combinedRating = getAverageRating(internal,google,zomato,yelp);

    $('#message').text(combinedRating.toString());
    
    if(google > 0) {
        $('#google-rating').text(google.toString());
    }
    else {
        $('#google-rating').text("Not Rated");
    } 

    if(zomato > 0) {
        $('#zomato-rating').text(zomato.toString());
    }
    else {
        $('#zomato-rating').text("Not Rated");
    } 
    
    if(yelp > 0) {
        $('#yelp-rating').text(yelp.toString());
    }
    else {
        $('#yelp-rating').text("Not Rated");
    } 

    //Add ratings
    colorStars(combinedRating, trureviewStars);
    colorStars(google, googleStars);
    colorStars(zomato, zomatoStars);
    colorStars(yelp, yelpStars);

}

var googleStars = ['#g1', '#g2', '#g3', '#g4', '#g5'];
var trureviewStars = ['#t1', '#t2', '#t3', '#t4', '#t5'];
var zomatoStars = ['#z1', '#z2', '#z3', '#z4', '#z5'];
var yelpStars = ['#y1', '#y2', '#y3', '#y4', '#y5'];
// JavaScript function that wraps everything
$(document).ready(function() {
    $("#name-submit").click(function () {
        $('#name-submit').hide();
        $('#address-submit').show();
        $('#address-search').delay(400).fadeIn(600);
    });


    $("#address-submit").click(function () {
        //Get values from text fields
        name = $('#name-search').val();
        address = $('#address-search').val();
        console.log("Name:"+ name);
        console.log("Address:"+ address);

        $('#address-search').fadeOut(500);
        $('#name-search').fadeOut(500);
        $('#name-submit').fadeOut(500);
        $('#address-submit').fadeOut(500);


        // searchComplete()

    });
});