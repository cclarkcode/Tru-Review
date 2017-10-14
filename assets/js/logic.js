$(document).ready(function() {

    $("#submit-button").on("click", function() { 
        var address = $("#address-input").val();
        if(!(address === null || address.match(/^ *$/) !== null)) {
            parsedAddress = parseAddress.parseLocation(address);
            console.log(parsedAddress);
            console.log(googleAddressQueryString(parsedAddress));       
            
            get(googleAddressQueryString(parsedAddress), getGoogleCoords);
        }
    });
});