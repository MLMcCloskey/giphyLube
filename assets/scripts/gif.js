var topics = ["Daffy Duck", "Wile E Coyote", "Homer Simpson", "Krusty The Clown", "Milhouse", "Meatwad", "Master Shake", "Scooby Doo", "Brak", "Randy Marsh"]
var newCharacter = "";

$("#characterCreation").on("click", function(){
    if ($("#newChar").val() != ""){
        newCharacter = $("#newChar").val();
        console.log(newCharacter);
        topics.push(newCharacter);
        $("#buttons").append("<button class= 'buttons' data-character="+"'"+ newCharacter +"'" +">" + newCharacter + "</button>");
        $("#newChar").val("");
    }
})

for (i = 0; i < topics.length; i++){
    $("#buttons").append("<button class= 'buttons' data-character="+"'"+topics[i]+"'" +">" + topics[i] + "</button>")
}



$("#buttons").on("click", function(){
    $("#gifs").html("")

    var character = $(event.target).attr("data-character");

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + character + "&api_key=1ywf3864371XbHo1h7URbMjUjwWdibHl&limit=10";

    console.log(character)

    $.ajax({
        url: queryURL,
        method: "GET"
    })

    .then(function(response){
        var results = response.data;
        for (var j = 0; j < results.length; j++){
            var characterDiv = $("<div id='anim'>");
            var title = $("<p>").text("Title: "+ results[j].title);
            var rating = $("<p>").text("Rating: " + results[j].rating);
            var characterImage = $("<img>");
            characterImage.attr({
                "src": results[j].images.fixed_height_still.url, 
                "class": 'animation',
                "data-state": 'still',
                "data-still": results[j].images.fixed_height_still.url,
                "data-animate": results[j].images.fixed_height.url,
            });
            characterDiv.append(characterImage);
            characterDiv.append(title);
            characterDiv.append(rating);
            $("#gifs").append(characterDiv);
        }
    })
})


$("#gifs").on("click", function(event){
    var state = $(event.target).attr("data-state");
    console.log(event.target);
    if (state === "still"){
        $(event.target).attr("src", $(event.target).attr("data-animate"));
        $(event.target).attr("data-state", "animate");
    } else {
        $(event.target).attr("src", $(event.target).attr("data-still"));
        $(event.target).attr("data-state", "still");
    }
})