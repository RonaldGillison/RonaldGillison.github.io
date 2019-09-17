$(document).ready(function() {

    var birdSpecies = ["eagle", "goose", "parrot", "tweety", "pigeon"];

    // loop to create the inital buttons
    for (var i =0; i < birdSpecies.length; i++) {
        var birdBtn = $("<button>");
        birdBtn.addClass("bird-button");
        birdBtn.attr("data-name", birdSpecies[i]);
        birdBtn.text(birdSpecies[i]);
        $("#buttons-view").append(birdBtn);
    }

    // function to add new buttons to the page
    function renderButtons() {

        $("#buttons-view").empty();

        for (var i = 0; i < birdSpecies.length; i++) {

            var newAdd = $("<button>");
            newAdd.addClass("bird-species");
            newAdd.attr("data-name", birdSpecies[i]);
            newAdd.text(birdSpecies[i]);
            $("#buttons-view").append(newAdd);
        }
    }

    renderButtons();

    //click event that handles what happens when the "add" button is clicked
    $("#new-species").on("click", function(event){
        event.preventDefault();

        var addition = $("#bird-input").val().trim();

        birdSpecies.push(addition);

        renderButtons();

        $("#bird-input").val("")
    });

    //function for displaying gifs on the page
    function displayBirdGif() {
        
        $("#gifs").empty();

        var bird = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + bird + "&api_key=OuIEsWNWuEDdEcWZRsFDPDMRY2bNvjG9"

        //ajax call to fetch gifs
        $.ajax ({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            console.log(response);
            // 
            var results = response.data;


            for (var i = 0; i < results.length; i++) {

                if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                    var animalDiv = $("<div>");
                    var p = $("<p>");
                    p.text("rating: " + results[i].rating);
                    var animalImage = $("<img>");
                    animalImage.attr("src", results[i].images.fixed_height_still.url);
                    animalImage.attr("data-still", results[i].images.fixed_height_still.url);
                    animalImage.attr("data-animate", results[i].images.fixed_height.url);
                    animalImage.attr("data-state", "still");
                    animalImage.addClass("pic")
                    animalDiv.append(p);
                    animalDiv.append(animalImage);
                    $("#gifs").prepend(animalDiv);
                }
            }

        });

        

    }

    function changeState(){
            
        var state = $(this).attr("data-state");
        var still = $(this).attr("data-animate");
        var animate = $(this).attr("data-still");
    
        if (state === "still") {
            $(this).attr("src", animate);
            $(this).attr("data-state", "animate");
        }
        else {
            $(this).attr("src", still);
            $(this).attr("data-state", "still");
        }

    }   

    $(document).on("click", ".bird-species", displayBirdGif);

    $(document).on("click", ".pic", changeState);
    

});