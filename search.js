var buttonArray = ["coffee","espresso","cappucino","latte","macchiato",];


//---------------
  $("#add-to-coffee-button").on("click", function() {
    event.preventDefault();
    var name = $("#newButton").val().trim();
    buttonArray.push(name);
    drawButtons();
    console.log(buttonArray);


//---------------
  });

drawButtons();

function drawButtons(){
$("#coffeeButtons").empty();

for(var i=0; i<buttonArray.length;i++){
    var buttonList = $("<button>");
    buttonList.text(buttonArray[i]);
    buttonList.attr("giphySearch", buttonArray[i]);
    $("#coffeeButtons").append(buttonList);
      buttonList.on("click", function() {
        var coffeeName = $(this).attr("giphySearch");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + coffeeName + "&api_key=dc6zaTOxFJmzC&limit=10";
        console.log(queryURL);



//-----------------

              $.ajax({
                url: queryURL,
                method: "GET"
                  }).done(function(response) {
                    console.log(response);
                      for(var j=0; j<10; j++){
                        var imageUrl = response.data[j].images.original.url;
                        var imageUrl_paused = response.data[j].images.original_still.url;
                        var imageRating = response.data[j].rating;
                        console.log("image " + j + " is " + imageUrl);
                        console.log("paused is " + imageUrl_paused);
                        console.log("rating is " + imageRating);
                        var coffeeImage = $("<img>");
                        coffeeImage.attr("src", imageUrl_paused);
                        coffeeImage.attr("alt", coffeeName + " image");
                        coffeeImage.attr("data-still", imageUrl_paused);
                        coffeeImage.attr("data-animate", imageUrl);
                        coffeeImage.attr("data-state", "still");
                        coffeeImage.attr("class", "gif");
                        $("#images").prepend(coffeeImage);
                        $("#images").prepend("<p> Rating is: " + imageRating + "</p>");
                      }

                      //----------------
  $(".gif").on("click", function() {
      var state = $(this).attr("data-state");

      if(state=="still"){
        $(this).attr("data-state", "animate");
        $(this).attr("src", $(this).attr("data-animate"));
      }else{
        $(this).attr("data-state", "still");
        $(this).attr("src", $(this).attr("data-still"));
      }

  });

                  });

      });
}
}
