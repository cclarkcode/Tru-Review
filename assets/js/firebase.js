// Initialize Firebase
var config = {
    apiKey: "AIzaSyBYfwqO-6fi-UxsGUo-YJYvur8cI5SY78E",
    authDomain: "tru-review.firebaseapp.com",
    databaseURL: "https://tru-review.firebaseio.com",
    projectId: "tru-review",
    storageBucket: "tru-review.appspot.com",
    messagingSenderId: "989272707956"
  };
  firebase.initializeApp(config);

var database = firebase.database();


$(document).ready(function () {

    /*var users = {
    	exampleUser: {
    		exampleRating: 4,
    		exampleReview: 'this place rocked, fam!'
    	}

    };*/
    var restaurants = {
    	exampleName: {
    		address: 'b street',
    		exampleReview: {
    			comments: 'this place rocked, fam!',
    			score: 4,
    			//user: users.exampleUser
    		}
    	}

    };

    console.log(restaurants.exampleName);
    database.ref().set({
        restaurants: restaurants
    })


    database.ref().on("value", function(snapshot) {

      console.log(snapshot.val().restaurants);

      // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });





});

//32.870875

//-117.224589
