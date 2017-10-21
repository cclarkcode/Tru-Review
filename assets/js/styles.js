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

    $(".review").delay(400).fadeIn(600);
  

    $('#message').text(name);

    $('#results').delay(400).fadeIn(600);
    $('#logo').css({
        'width': '30%',
        'height': '30%',
        'margin-left': '35%'
    });
    $('#mascot').css({
        'width': '10%',
        'height': '10%',
        'margin-left': '48%'
    }).attr('src', 'assets/media/mascot.gif');
    // Add numeric labels with ratings
    var combinedRating = getAverageRating(internal,google,zomato,yelp);

    $('#trureviewRating').text(combinedRating.toString());
    
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

function loadingMessage() {
    var messages = [
        'Getting ratings now!',
        'Searching for your ratings!',
        'Your ratings coming right up!'
    ];
    var rdm = Math.floor(Math.random() * 3);
    return messages[rdm]
}

function nameValidation(name) {
    if (name === '') {
        $('#message').text('Oops! You forgot to enter a restaurant!');
    } else {
        $('#message').text('I need an address to get extra good results =)');
        $('#name-submit').hide();
        $('#address-submit').show();
        $('#address-search').delay(400).fadeIn(600);
    }
}

function addressValidation(address) {
    if (address === '') {
        $('#message').text('I can\'t find the ratings without an address. Help me out!');
    } else {
        $('#message').text(loadingMessage());
        $('#address-search').fadeOut(500);
        $('#name-search').fadeOut(500);
        $('#name-submit').fadeOut(500);
        $('#address-submit').fadeOut(500);
        $('#mascot').attr('src', "assets/media/mascot-2.gif")
    }
}

// JavaScript function that wraps everything
$(document).ready(function() {
    $("#name-submit").click(function () {
        //Get values from text fields
        name = $('#name-search').val();
        console.log("Name:"+ name);
        nameValidation(name);
    });


    $("#address-submit").click(function () {
        //Get values from text fields
        address = $('#address-search').val();
        console.log("Address:"+ address);
        addressValidation(address);



        // searchComplete()

    });
});

function buildReviews(ratingsarray) {

    var snapshot = ratingsarray[3];
    var ourrating = dbrating(snapshot);
    console.log(ourrating);

    $('#trrating').text(ourrating);

    
    console.log(snapshot.reviews.length);

    for (var i = 0; i < snapshot.reviews.length; i++) {

        var reviewbody = $('.sample').clone();
        reviewbody.removeClass('sample');
        reviewbody.find(".review-name").text(snapshot.reviews[i].Name);
        reviewbody.find("#review-rating").text(snapshot.reviews[i].Rating);
        reviewbody.find(".review-comment").text(snapshot.reviews[i].Comment);
        $(".review").append(reviewbody);
        
    }
    
    $('.sample').css("display", 'none');


    console.log('getting here');

}