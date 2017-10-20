
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
                return request({
                    method: 'POST',
                    url: zomatoRestaurantSearch(coords, frmtName),
                    headers: {
                        "user-key": "f73f1e3b1f28a94ae801eb97cf84f822"
                       }
                });
            })
            .then(function (detailsResponse) {
                console.log(JSON.parse(detailsResponse));
            });
            // .then(function(restraurantResponse) {
            //     console.log(restraurantResponse);
            // });

            request(proxyOptions('GET', frmtAddr))  
            .then(function (coordsResponse) {
                var coords = coordinates(coordsResponse);
                return request(proxyOptions('GET', googleDetailSearch(coords, frmtName)));
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

