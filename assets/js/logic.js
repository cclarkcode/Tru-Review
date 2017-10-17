$(document).ready(function() {

    $("#submit-button").on("click", function() { 

        var address = $("#address-input").val().trim();
        
        if(!(address === null || address.match(/^ *$/) !== null)) {
            //callGoogle(address.replace(' ', '+'), "");\
            var testUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=803+archer+st+san+diego+ca&key=AIzaSyDFJA-1O_YEj46FAJKk48WibUoT7YHdK1E";
            var options = proxyOptions('GET', testUrl);

            request(options)
            .then(function (response) {
                console.log(coordinates(JSON.parse(response)));
            });
        }
    });
});