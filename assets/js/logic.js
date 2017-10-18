$(document).ready(function() {

    $("#submit-button").on("click", function() { 
        var name = $("#name-input").val().trim();
        var address = $("#address-input").val().trim();
        
        if(!(address === null || address.match(/^ *$/) !== null)) {
            var frmtAddr = addressSearch(address);
            var frmtName = formatInput(name);

            request(proxyOptions('GET', frmtAddr))
            .then(function (coordsResponse) {
                var coords = coordinates(coordsResponse);
                return request(proxyOptions('GET', detailSearch(coords, frmtName)));
            })
            .then(function (detailsResponse) {
                return getRestaurant(name, detailsResponse);
            })
            .then(function(restraurantResponse) {
                console.log(restraurantResponse);
            });
        }
    });
});

function formatInput(field) {
    return field.replace(' ', '+')
                .replace('.', '+')
                .replace(',', '+');
}