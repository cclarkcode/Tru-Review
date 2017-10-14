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

$(document).ready(function () {

    var users = {
    	exampleUser {
    		exampleRating: 4,
    		exampleReview: 'this place rocked, fam!'
    	}

    };
    var restaurants = {
    	exampleName {
    		address: 'b street',
    		exampleReview {
    			comments: 'this place rocked, fam!',
    			score: 4,
    			user: exampleUser
    		}
    	}

    };

    var database = firebase.database().ref('users');

    database.on('child_added',
        function (childRefSnapshot) {
            console.log(childRefSnapshot);
            console.log(childRefSnapshot.val());
            
            var dataObject = childRefSnapshot.val();
            
            var dataAtDataKey = dataObject.name;
            
            var stringifiedObject = JSON.stringify(dataObject, null, 4);

            snapshotDiv.html('<pre>' + stringifiedObject + '</pre>');

            // The dataKey reference came from our object definition.
            // dataDiv is defined as a variable above.
            dataDiv.text(dataAtDataKey);
        }
    );

    $('.button').on('click', function (event) {
        var newName = $('#results').val().trim();

        database.push({ name: newName });
    })

});

//32.870875

//-117.224589
