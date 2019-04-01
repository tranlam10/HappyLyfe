let authToken = localStorage.getItem("authToken");
let userId = localStorage.getItem("userId");

$(".getData").click(function() {
    $.ajax({
		method: 'GET',
		url: "/api/data/show",
		headers: {
            //check passport documentation and see what headers they expect
            //Bearer
            Authorization: `Bearer ${authToken}`
            //store token, when user refreshes the page, should check token for the user
        },
        data: { "userId": userId },
		contentType: 'application/json',
		success: function(userData) {
            let date = "date";
            let gym = "gym";
            let sleep = "sleep";
            let social = "social";
            let diet = "diet";
            let mood = "mood";
            $("ul").html('');
            userData.map(function(data) {
                return $("ul").append(
                    `<li>
                        ${date}: ${data[date].slice(0,10)}
                        <i class="fas fa-dumbbell"></i>${gym}: ${data[gym]}
                        <i class="fas fa-bed"></i>${sleep}: ${data[sleep]}
                        ${social}: ${data[social]}
                        ${diet}: ${data[diet]}
                        ${mood}: ${data[mood]}
                    </li>`
                );
            });
        }
    }).fail(function(response) {
        $('ul').html(response.responseText + ". Please login!");
    });
});

//posting data
$(".postData").click(function() {
    $(".newItem").show();

});


$('.newItemForm').submit(function(event) {
    event.preventDefault();
    const date = $('input[name="date"]').val();
    const gym = $('input[name="gym"]').val();
    const sleep = $('input[name="sleep"]').val();
    const social = $('input[name="social"]').val();
    const diet = $('input[name="diet"]').val();
    const mood = $('input[name="mood"]').val();

    const data = {
        "userId": userId,
        "date": date,
        "gym": gym,
        "sleep": sleep,
        "social": social,
        "diet": diet,
        "mood": mood
    };
    var settings = {
        "url": "/api/data/",
        "method": "POST",
        "headers": {
            //sending body as JSON data
          "content-type": "application/json"
        },
        "data": JSON.stringify(data)
      }
      
      $.ajax(settings).done(function(response) {
          console.log(response);
      });
});

$("li").on("click", function() {
    console.log("CLICKED");
});

$(document).ready(function() {
    $(".newItem").hide();

    if (authToken && window.location.pathname == "/index.html") {
        window.location.href = "info.html";
    }
    //check if auth token, dont want user to login if they are alerady logged in
    //in the future, separate into separate files
    //one javascript for logging in, one for exercises
    //utility file for checking jwt
    //url matching file structure in public

    //https://www.w3schools.com/jsref/prop_win_localstorage.asp
    //store token in localStorage, check the value of authtoken in local storage 
    //do this on page load

    //when logging out, remove the auth token, passport creates log out function

    // $(".login").click(function() {
    //     $(".homepage").hide();
    //     $(".loginPage").show();
    // });

    $('.registerForm').submit(function(event) {
        event.preventDefault();
        const firstName = $('input[name="firstName"]').val();
        const lastName = $('input[name="lastName"]').val();
        const username = $('input[name="username"]').val();
        const password = $('input[name="password"]').val();
        const credentials = {
            "username": username,
            "password": password,
            "firstName": firstName,
            "lastName": lastName
        };
        var settings = {
            "url": "/api/users/",
            "method": "POST",
            "headers": {
                //sending body as JSON data
              "content-type": "application/json"
            },
            "data": JSON.stringify(credentials)
          }
          
          $.ajax(settings).done(function(response) {
                window.location.href = "login.html";
          });

          $.ajax(settings).fail(function(response) {
            $(".registerError").html(response.responseJSON.message);
            });
    });

          $('.loginForm').submit(function(event) {
            event.preventDefault();
            const username = $('input[name="username"]').val();
            const password = $('input[name="password"]').val();
            const credentials = {
                "username": username,
                "password": password
            };
            var settings = {
                "url": "/api/auth/login",
                "method": "POST",
                "headers": {
                    //sending body as JSON data
                  "content-type": "application/json"
                },
                "data": JSON.stringify(credentials)
              }
              
              $.ajax(settings).done(function(response) {
                  console.log(response);
                  localStorage.setItem("authToken", response[0].authToken);
                  localStorage.setItem("userId", response[1]._id);
                  window.location.href = "info.html";
              });
        });

        $(".logout").click(function() {
            localStorage.setItem("authToken", '');
            localStorage.setItem("userId", '');
            window.location.href = "index.html";
        });

        $("li").click(function() {
            console.log("CLICKED");
        });

          //try making authorization.js in public 
          //get it
          //send token to check if user is logged in
          //put JWT as middleware and it will check and will let you continue
          //can send that token to every single request we have

          //GET endpoint after logging in, add a few pieces of data to see if code working, add data with mongo IMPORt
          //POST to create


        // $.ajax({
        //     "url": '/api/auth/login',
        //     "dataType": 'json',
        //     "type": 'POST',
        //     "data": credentials,
        //     "success": function(data) {
        //         console.log("nice!!");
        //     }
        // });
});