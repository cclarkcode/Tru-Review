// JavaScript function that wraps everything
$(document).ready(function() {
    $("#name-submit").click(function () {
        console.log("something");
        $('#name-search').fadeOut(1000);
        $('#address-search').delay(1000).fadeIn(1000);

    });
    $("#address-submit").click(function () {
        console.log("something");
        $('#address-search').fadeOut(1000);
        $('#results').delay(1000).fadeIn(1000);
        $('#logo').css('width', '20%').css('height', '20%').css('margin-left', '40%');
        $('#mascot').css('width', '20%').css('height', '20%').css('margin-left', '40%');

    });
});