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


// $(document).ready(function () {

//     /*var users = {
//     	exampleUser: {
//     		exampleRating: 4,
//     		exampleReview: 'this place rocked, fam!'
//     	}

//     };*/
//     // var restaurants = {
//     // 	exampleName: {
//     // 		address: 'b street',
//     // 		exampleReview: {
//     // 			comments: 'this place rocked, fam!',
//     // 			score: 4,
//     // 			//user: users.exampleUser
//     // 		}
//     // 	}

//     // };

//     // console.log(restaurants.exampleName);
//     // database.ref().set({
//     //     restaurants: restaurants
//     // })


//     // database.ref().on("value", function(snapshot) {

//     //   console.log(snapshot.val().restaurants);

//     //   // Handle the errors
//     // }, function(errorObject) {
//     //   console.log("Errors handled: " + errorObject.code);
//     // });





// });

// function fbinitial(frmtName, frmtAddr) {

//     database.ref('/tru-review').once("value", function(snapshot) {

//         return snapshot

//     });


// }

// setup();


//Finds restaurant in database based on address, if not there, adds to database
function dbfind(name, address, ratingsarray, callback) {

    var id;

    console.log("Find address in :");
    console.log(ratingsarray);

    address = formatInput(ratingsarray[0].location.display_address[0] + ' ' + ratingsarray[0].location.display_address[1]);

    database.ref('/restaurants').once("value", function(snapshot){

        var snap = snapshot.val();

        var found = false;

        for (var i = 0; i < snap.length; i++) {
            if (snap[i].address === address) {
                found=true;
                id = i.toString();
            }
        }

       
        if(!found) {
            id = snap.length.toString();
            database.ref('/restaurants/' + id).set({
                name: name,
                address: address,
                reviews: null
            })
        }
        else {
            console.log("Exists in database");
        }

        database.ref('/restaurants/' + id).once("value", function (snapshot) {

            ratingsarray.push(snapshot.val());
            console.log(ratingsarray);
            callback(ratingsarray);
        })

    })


}

function setup () {

    database.ref('/restaurants').set([{
        name: "Flemings",
        address: "8970+University+Center+Ln+San+Diego+CA+92122",
        reviews: [{
            Name: 'John',
            Rating: 4,
            Comment: 'Decent wine list and good service'
        },
        {
            Name: 'Parker',
            Rating: 5,
            Comment: 'Best steak I\'ve ever had'
        },
        {
            Name: 'Chris',
            Rating: 3,
            Comment: 'It\'s alright, but I don\'t know what the fuss is all about'
        }]
    }]);

   
}

function reviewadd(addr, nam, com, rat, callback) {

    database.ref('/restaurants').once("value", function(snapshot){

        var snap = snapshot.val();
        var id = findid(addr,snap);
        var reviewid;
        
        const exists=snap[id].reviews;

        if(exists) {
            reviewid = snap[id].reviews.length.toString();
        }
        else {
            reviewid = '0';
        }

        database.ref('/restaurants/' + id + '/reviews/' + reviewid).set({
            Name: nam,
            Comment: com,
            Rating: rat
        });


        callback(addr);  


    });      


}

function findid(addr, snapshot) {

    var id;

    for (var i = 0; i < snapshot.length; i++) {
            console.log(snapshot[i].address);
            if (snapshot[i].address === addr) {
                id = i;
                console.log("Found");
            }
        }

        return id

}

function dbrating(name,addr,ratingsarray,callback) {

    database.ref('/restaurants').once("value", function(snapshot) {

        var snap = snapshot.val();
        var id = findid(addr,snap);
        var totalstars = 0;

        const exists=snap[id].reviews;

        if(exists) {
            for (var i = 0; i < snap[id].reviews.length; i++) {
                totalstars += snap[id].reviews[i].Rating;
            }
            console.log(totalstars);
            console.log(snap[id].reviews.length);
            console.log(totalstars/(snap[id].reviews.length));
        }
        else {
            console.log("No ratings")
        }

        callback(ratingsarray);
        


    });


}


