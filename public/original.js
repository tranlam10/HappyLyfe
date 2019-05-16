let authToken = localStorage.getItem("authToken");
let userId = localStorage.getItem("userId");
let username = localStorage.getItem("username");

// $.ajax({
//     method: 'GET',
//     url: "/api/data/show",
//     headers: {
//         //check passport documentation and see what headers they expect
//         //Bearer
//         Authorization: `Bearer ${authToken}`
//         //store token, when user refreshes the page, should check token for the user
//     },
//     data: { "userId": userId },
//     contentType: 'application/json',
//     success: function(userData) {
//         console.log(userData);
//         let date = "date";
//         let gym = "gym";
//         let sleep = "sleep";
//         let social = "social";
//         let diet = "diet";
//         let mood = "mood";
//         $("ul").html('');
//         userData.map(function(data) {
//             return $("ul").append(
//                 `<li class="listItem" dataId="${data._id}">
//                     ${date}: ${data[date].slice(0,10)}
//                     <i class="fas fa-dumbbell"></i>${gym}: ${data[gym]}
//                     <i class="fas fa-bed"></i>${sleep}: ${data[sleep]}
//                     ${social}: ${data[social]}
//                     ${diet}: ${data[diet]}
//                     ${mood}: ${data[mood]}
//                     <div class="listButton">
//                         <div>
//                             <button class="edit">Edit</button>
//                         </div>
//                         <button class="delete">Delete</button>
//                     </div>
//                 </li>`
//             );
//         });
//         $(".listButton").hide();
//         $("li").click(function() {
//             $(".listButton").show();
//         });
//         $(".edit").click(function() {
//             $(this).parent().html(
//                 `<button class="edit">Edit</button>
//                 <div class="editItem">
//                     <form class="editItemForm" method="post">
//                         <fieldset>
//                             <legend>Please fill in all fields</legend>
//                             <label>
//                                 Date:
//                                 <input type="date" id="dateEntry" name="date" value="2018-07-22" min="2019-01-01" max="2050-12-31" required>
//                             </label>
//                             <label>
//                                 Gym
//                                 <input type="text" name="gym" placeholder="0-5" required>
//                             </label>
//                             <label>
//                                 Sleep
//                                 <input type="text" name="sleep" placeholder="0-5" required>
//                             </label>
//                             <label>
//                                 Social
//                                 <input type="text" name="social" placeholder="0-5" required>
//                             </label>
//                             <label>
//                                 Diet
//                                 <input type="text" name="diet" placeholder="0-5" required>
//                             </label>
//                             <label>
//                                 Mood
//                                 <input type="text" name="mood" placeholder="0-5" required>
//                             </label>
//                         </fieldset>
//                         <button type="submit" class="submitEditItem">Submit New Items</button>
//                     </form>
//                 </div>`
//             );
//             let today = new Date();
// 			let date = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
// 			document.getElementById('dateEntry').value = date;

//             //working on this right now
//             $('.editItemForm').submit(function(event) {
//                 event.preventDefault();
//                 const date = $('input[name="date"]').val();
//                 const gym = $('input[name="gym"]').val();
//                 const sleep = $('input[name="sleep"]').val();
//                 const social = $('input[name="social"]').val();
//                 const diet = $('input[name="diet"]').val();
//                 const mood = $('input[name="mood"]').val();
//                 const id = $(this).parent().parent().parent().parent()[0].attributes.dataid.nodeValue;
//                 const route = "/api/data/" + id;

//                 const data = {
//                     "date": date,
//                     "gym": gym,
//                     "sleep": sleep,
//                     "social": social,
//                     "diet": diet,
//                     "mood": mood
//                 };

//                 console.log(route);
//                 var settings = {
//                     "url": route,
//                     "method": "PUT",
//                     "headers": {
//                         //sending body as JSON data
//                     "content-type": "application/json"
//                     },
//                     "data": JSON.stringify(data)
//                 }
                
//                 $.ajax(settings).done(function(data) {
//                     window.location.href = "info.html";
//                     // let date = "date";
//                     // let gym = "gym";
//                     // let sleep = "sleep";
//                     // let social = "social";
//                     // let diet = "diet";
//                     // let mood = "mood";
//                     // $(this).parent().append(
//                     //     `<li class="listItem">
//                     //         ${date}: ${data[date].slice(0,10)}
//                     //         <i class="fas fa-dumbbell"></i>${gym}: ${data[gym]}
//                     //         <i class="fas fa-bed"></i>${sleep}: ${data[sleep]}
//                     //         ${social}: ${data[social]}
//                     //         ${diet}: ${data[diet]}
//                     //         ${mood}: ${data[mood]}
//                     //         <div class="listButton">
//                     //             <div>
//                     //                 <button class="edit">Edit</button>
//                     //             </div>
//                     //             <button class="delete">Delete</button>
//                     //         </div>
//                     //     </li>`
//                     // );
//                 });
//             });

//             $('.delete').click(function() {
//                 const id = $(this).parent().parent().parent()[0];
//                 console.log(id);
//                 console.log("Clicked");
//                 const data = {
//                     id: id
//                 };
                
//                 var settings = {
//                     "url": "/api/data/",
//                     "method": "DELETE",
//                     "headers": {
//                         //sending body as JSON data
//                     "content-type": "application/json"
//                     },
//                     "data": JSON.stringify(data)
//                 };
                
//                 $.ajax(settings).done(function(data) {
//                     console.log("DELETED IT");
//                     window.location.href = "info.html";
//                 });
//             });
//         });
//     }
// }).fail(function(response) {
//     $('ul').html(response.responseText + ". Please login!");
// });

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
            console.log(userData);
            let date = "date";
            let gym = "gym";
            let sleep = "sleep";
            let social = "social";
            let diet = "diet";
            let mood = "mood";
            $("ul").html('');
            userData.map(function(data) {
                return $("ul").append(
                    `<li class="listItem" dataId="${data._id}">
                        ${date}: ${data[date].slice(0,10)}
                        <i class="fas fa-dumbbell"></i>${gym}: ${data[gym]}
                        <i class="fas fa-bed"></i>${sleep}: ${data[sleep]}
                        ${social}: ${data[social]}
                        ${diet}: ${data[diet]}
                        ${mood}: ${data[mood]}
                        <div class="listButton">
                            <div>
                                <button class="edit">Edit</button>
                            </div>
                            <button class="delete">Delete</button>
                        </div>
                    </li>`
                );
            });
            $(".listButton").hide();
            $("li").click(function() {
                $(".listButton").show();
            });
            $(".edit").click(function() {
                $(this).parent().html(
                    `<button class="edit">Edit</button>
                    <div class="editItem">
                        <form class="editItemForm" method="post">
                            <fieldset>
                                <legend>Please fill in all fields</legend>
                                <label>
                                    Date:
                                    <input type="date" id="dateEntry" name="date" value="2018-07-22" min="2019-01-01" max="2050-12-31" required>
                                </label>
                                <label>
                                    Gym
                                    <input type="text" name="gym" placeholder="0-5" required>
                                </label>
                                <label>
                                    Sleep
                                    <input type="text" name="sleep" placeholder="0-5" required>
                                </label>
                                <label>
                                    Social
                                    <input type="text" name="social" placeholder="0-5" required>
                                </label>
                                <label>
                                    Diet
                                    <input type="text" name="diet" placeholder="0-5" required>
                                </label>
                                <label>
                                    Mood
                                    <input type="text" name="mood" placeholder="0-5" required>
                                </label>
                            </fieldset>
                            <button type="submit" class="submitEditItem">Submit New Items</button>
                        </form>
                    </div>`
                );

                //working on this right now
                $('.editItemForm').submit(function(event) {
                    event.preventDefault();
                    const date = $('input[name="date"]').val();
                    const gym = $('input[name="gym"]').val();
                    const sleep = $('input[name="sleep"]').val();
                    const social = $('input[name="social"]').val();
                    const diet = $('input[name="diet"]').val();
                    const mood = $('input[name="mood"]').val();
                    const id = $(this).parent().parent().parent().parent()[0].attributes.dataid.nodeValue;
                    const route = "/api/data/" + id;

                    const data = {
                        "date": date,
                        "gym": gym,
                        "sleep": sleep,
                        "social": social,
                        "diet": diet,
                        "mood": mood
                    };

                    console.log(route);
                    var settings = {
                        "url": route,
                        "method": "PUT",
                        "headers": {
                            //sending body as JSON data
                        "content-type": "application/json"
                        },
                        "data": JSON.stringify(data)
                    }
                    
                    $.ajax(settings).done(function(data) {
                        window.location.href = "info.html";
                        // let date = "date";
                        // let gym = "gym";
                        // let sleep = "sleep";
                        // let social = "social";
                        // let diet = "diet";
                        // let mood = "mood";
                        // $(this).parent().append(
                        //     `<li class="listItem">
                        //         ${date}: ${data[date].slice(0,10)}
                        //         <i class="fas fa-dumbbell"></i>${gym}: ${data[gym]}
                        //         <i class="fas fa-bed"></i>${sleep}: ${data[sleep]}
                        //         ${social}: ${data[social]}
                        //         ${diet}: ${data[diet]}
                        //         ${mood}: ${data[mood]}
                        //         <div class="listButton">
                        //             <div>
                        //                 <button class="edit">Edit</button>
                        //             </div>
                        //             <button class="delete">Delete</button>
                        //         </div>
                        //     </li>`
                        // );
                    });
                });

                $('.delete').click(function() {
                    var settings = {
                        "url": "/api/users/",
                        "method": "DELETE",
                        "headers": {
                            //sending body as JSON data
                        "content-type": "application/json"
                        },
                        "data": JSON.stringify(data)
                    }
                    
                    $.ajax(settings).done(function(data) {
                        console.log("DELETED IT");
                    });
                });
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
            console.log(userData);
            let date = "date";
            let gym = "gym";
            let sleep = "sleep";
            let social = "social";
            let diet = "diet";
            let mood = "mood";
            $("ul").html('');
            userData.map(function(data) {
                return $("ul").append(
                    `<li class="listItem" dataId="${data._id}">
                        ${date}: ${data[date].slice(0,10)}
                        <i class="fas fa-dumbbell"></i>${gym}: ${data[gym]}
                        <i class="fas fa-bed"></i>${sleep}: ${data[sleep]}
                        ${social}: ${data[social]}
                        ${diet}: ${data[diet]}
                        ${mood}: ${data[mood]}
                        <div class="listButton">
                            <div>
                                <button class="edit">Edit</button>
                            </div>
                            <button class="delete">Delete</button>
                        </div>
                    </li>`
                );
            });
            $(".listButton").hide();
            $("li").click(function() {
                $(".listButton").show();
            });
        }
    }).fail(function(response) {
        $('ul').html(response.responseText + ". Please login!");
    });

    $(".edit").click(function() {
        $(this).parent().html(
            `<button class="edit">Edit</button>
            <div class="editItem">
                <form class="editItemForm" method="post">
                    <fieldset>
                        <legend>Please fill in all fields</legend>
                        <label>
                            Date:
                            <input type="date" id="dateEntry" name="date" value="2018-07-22" min="2019-01-01" max="2050-12-31" required>
                        </label>
                        <label>
                            Gym
                            <input type="text" name="gym" placeholder="0-5" required>
                        </label>
                        <label>
                            Sleep
                            <input type="text" name="sleep" placeholder="0-5" required>
                        </label>
                        <label>
                            Social
                            <input type="text" name="social" placeholder="0-5" required>
                        </label>
                        <label>
                            Diet
                            <input type="text" name="diet" placeholder="0-5" required>
                        </label>
                        <label>
                            Mood
                            <input type="text" name="mood" placeholder="0-5" required>
                        </label>
                    </fieldset>
                    <button type="submit" class="submitEditItem">Submit New Items</button>
                </form>
            </div>`
        );
        let today = new Date();
        let date = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
        document.getElementById('dateEntry').value = date;

        //working on this right now
        $('.editItemForm').submit(function(event) {
            event.preventDefault();
            const date = $('input[name="date"]').val();
            const gym = $('input[name="gym"]').val();
            const sleep = $('input[name="sleep"]').val();
            const social = $('input[name="social"]').val();
            const diet = $('input[name="diet"]').val();
            const mood = $('input[name="mood"]').val();
            const id = $(this).parent().parent().parent().parent()[0].attributes.dataid.nodeValue;
            const route = "/api/data/" + id;

            const data = {
                "date": date,
                "gym": gym,
                "sleep": sleep,
                "social": social,
                "diet": diet,
                "mood": mood
            };

            console.log(route);
            var settings = {
                "url": route,
                "method": "PUT",
                "headers": {
                    //sending body as JSON data
                "content-type": "application/json"
                },
                "data": JSON.stringify(data)
            }
            
            $.ajax(settings).done(function(data) {
                window.location.href = "info.html";
                // let date = "date";
                // let gym = "gym";
                // let sleep = "sleep";
                // let social = "social";
                // let diet = "diet";
                // let mood = "mood";
                // $(this).parent().append(
                //     `<li class="listItem">
                //         ${date}: ${data[date].slice(0,10)}
                //         <i class="fas fa-dumbbell"></i>${gym}: ${data[gym]}
                //         <i class="fas fa-bed"></i>${sleep}: ${data[sleep]}
                //         ${social}: ${data[social]}
                //         ${diet}: ${data[diet]}
                //         ${mood}: ${data[mood]}
                //         <div class="listButton">
                //             <div>
                //                 <button class="edit">Edit</button>
                //             </div>
                //             <button class="delete">Delete</button>
                //         </div>
                //     </li>`
                // );
            });
        });

        $('.delete').click(function() {
            // const id = $(this).parent();
            // console.log(id);
            console.log("Clicked delete");
            const data = {
                id: userId
            };
            
            var settings = {
                "url": "/api/data/",
                "method": "DELETE",
                "headers": {
                    //sending body as JSON data
                "content-type": "application/json"
                },
                "data": JSON.stringify(data)
            };
            
            $.ajax(settings).done(function(data) {
                console.log("DELETED IT");
                window.location.href = "info.html";
            });
        });
    });

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
                  localStorage.setItem("username", credentials.username);
                  window.location.href = "info.html";
              });
        });

        $(".logout").click(function() {
            localStorage.setItem("authToken", '');
            localStorage.setItem("userId", '');
            localStorage.setItem("username", '');
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