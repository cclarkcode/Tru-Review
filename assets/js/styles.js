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
    for (var i = 0; i < ratings.length; i++) {
        if (ratings[i] !== 0){
            average += ratings[i];
        }
    }
    if (average === 0) {
        return 'No ratings available';
    } else {
        return average;
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
function searchComplete() {
    $('#results').delay(400).fadeIn(600);
    $('#logo').css({
        'width': '40%',
        'height': '40%',
        'margin-left': '30%'
    });
    $('#mascot').css({
        'width': '20%',
        'height': '20%',
        'margin-left': '40%'
    });

    //Add ratings
    colorStars(combinedRating, trureviewStars);
    colorStars(googleRating, googleStars);
    colorStars(zomatoRating, zomatoStars);
    colorStars(yelpRating, yelpStars);

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
        searchComplete()

    });
});