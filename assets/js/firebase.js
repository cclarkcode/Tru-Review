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

    var snapshotDiv = $('#snapshot');
    var dataDiv = $('#data');

    var firebaseRef = firebase.database().ref('/example-ref');

    firebaseRef.on('child_added',
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

    $('#submit').on('click', function (event) {
        var newName = $('#result').val().trim();

        firebaseRef.push({ name: newName });
    })

});

//32.870875

//-117.224589
