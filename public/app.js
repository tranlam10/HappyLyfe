let MOCK_DATA = [
    {
        "Gym": 3,
        "Sleep": 5,
        "Social": 3,
        "Diet": 2,
        "Mood": 4
    },
    {
        "Gym": 1,
        "Sleep": 4,
        "Social": 3,
        "Diet": 4,
        "Mood": 3
    },
    {
        "Gym": 2,
        "Sleep": 3,
        "Social": 3,
        "Diet": 1,
        "Mood": 3
    },
    {
        "Gym": 4,
        "Sleep": 2,
        "Social": 3,
        "Diet": 2,
        "Mood": 4
    }
];

function displayMetrics() {
    let gym = "Gym";
    let sleep = "Sleep";
    let social = "Social";
    let diet = "Diet";
    let mood = "Mood";
    console.log(MOCK_DATA[1]);
    const results = MOCK_DATA.map(function(data) {
        return $('ul').append(
            `<li>
                <i class="fas fa-dumbbell"></i>${gym}: ${data[gym]}
                <i class="fas fa-bed"></i>${sleep}: ${data[sleep]}
                ${social}: ${data[social]}
                ${diet}: ${data[diet]}
                ${mood}: ${data[mood]}
            </li>`
        );
    });

    console.log(results);
}

function viewLog() {
    
}

$(displayMetrics);

$(document).ready(function() {
    $(".login").click(function() {
        console.log("hello");
    });
});