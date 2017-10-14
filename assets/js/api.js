


function opentableapi (restaurant, zip, callback) {

    //Returns through callback first restaurant in list searching by name and zip code

    //Query string
    var queryURL = "https://opentable.herokuapp.com/api/restaurants?name=" + restaurant + "&zip=" + zip;

    //API call
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {

      //Placeholder for information
      var info=response.restaurants[0];

      //Returns data here
      callback(info);
    
    });

  }

  function zomatoapi (restaurant, zip, callback) {

    //Returns through callback first restaurant in list searching by name and zip code

    //Query string
    var queryURL = "https://opentable.herokuapp.com/api/restaurants?name=" + restaurant + "&zip=" + zip;

    //API call
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {

      //Placeholder for information
      var info=response.restaurants[0];

      //Returns data here
      callback(info);
    
    });

  }