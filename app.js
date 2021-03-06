$(document).ready(function() {

    var trendingURL = "https://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC";

    // Adds buttons with trending Gifs
    $.ajax({
        url:trendingURL,
        method:"GET"
    }).done(function(response){
        $.each(response.data, function(i,v) {
            var gif = this;
            var title = gif.title;
            var buttonText = "";

            // console.log(gif);

            // This removes the ' GIF by' after the title of each GIF
            if (title.indexOf(" GIF") >=0) {
                buttonText = title.substr(0, title.indexOf(" GIF"));
            }

            //Creates a button for each trending GIF
            var button = $("<button>").text(buttonText);
            button.attr('class','gif-button btn btn-secondary btn-sm');
            button.attr('data-title',this.images.original.url);

            // scroll into viewport after click
            //button.attr('onClick','document.getElementById(`'gifs'`).scrollIntoView()');


            $("#trending").append(button);
        });
    });

    $("#gifSearchBtn").on("click", function(event) {
        event.preventDefault();
        var gif = $("#gifSearch").val();
        var button = $("<button>").text(gif);
        button.attr('class','gif-button btn btn-dark btn');
        $('#searched').append(button);
        gifDisplay(gif);
    });

    $(".jumbotron").on("click",".gif-button" , function() {
        if ($(this).attr('data-title')) {
            $("#gifs").html("<img src=" + $(this).attr('data-title') + ">");
        }
        else {
            gifDisplay($(this).text());
        }
    });

    function gifDisplay(gif) {
        $("#gifs").empty();
        var results = $("#numOfResults").val();
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q=" + gif + "&limit=" + results;

        $.ajax({
            url:queryURL,
            method:"GET"
        }).done(function(response){
            var gifs = response.data;
            $.each(gifs, function(i,v) {
                var pic = this;
                var display = pic.images.fixed_height_still.url;
                var moving = pic.images.fixed_height.url;
                var rating = $("<p>").text("rating: "+ pic.rating);
                var img = $("<img>").attr('src',display);
                img.attr('data-still',display);
                img.attr('data-animate',moving);
                img.attr('state','still');
                var gifDiv = $("<div>").append(img).append(rating);
                gifDiv.attr('class','gif');
                $("#gifs").append(gifDiv);
            });

        });
    }

    $("#gifs").on("click",".gif", function () {
        var state = $(this).children('img').attr('state');
        var still = $(this).children('img').attr('data-still');
        var animate = $(this).children('img').attr('data-animate');

        if (state === "still") {
            $(this).children('img').attr('state','animate');
            $(this).children('img').attr('src',animate);
        }
        else {
            $(this).children('img').attr('state','still');
            $(this).children('img').attr('src',still);
        }

    });

    $("#clearBtn").on("click", function() {
        $("#gifSearch").val("");
        $("#gifs").empty();
    });

});
