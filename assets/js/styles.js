// User inputs
var name = '';
var address = '';

//Individual ratings
var trureviewRating = 0;
var googleRating = 0;
var zomatoRating = 0;
var yelpRating = 0;

//Combined average rating
var averageRating = 0;

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

    });
});