$(document).ready(function() {

    $("#submit-button").on("click", function() { 

        var name = $("#name-input").val().trim();
        var address = $("#address-input").val().trim();
        
        if(!(address === null || address.match(/^ *$/) !== null)) {
            var frmtAddr = addressSearch(address);
            
            request(proxyOptions('GET', frmtAddr))
            .then(function (coordsResponse) {
                var coords = coordinates(JSON.parse(coordsResponse));
                return request(proxyOptions('GET', detailSearch(coords, name)));
            })
            .then(function (detailsResponse) {
                console.log(JSON.parse(detailsResponse));
            });
        }
    });
});

function formatInput(field) {
    return field.replace(' ', '+')
                .replace('.', '+')
                .replace(',', '+');
}