$(document).ready(function () {


    let comedianArray = ['bill burr', 'jim jeffries', 'bo burnham', 'mike birbiglia', 'james acaster', 'john mulaney', 'demetri martin', 'louis ck', 'aziz ansari', 'dave chapelle']


    for (i = 0; i < comedianArray.length; i++) {
        // add a button and give it: text & attribute = comedian in array
        $("#comedian-buttons").append($("<button>").text(comedianArray[i]).attr("data-comedian", comedianArray[i]));
    }

    $(document.body).on("click", "#add-comedian", function () {
        event.preventDefault();
        let userInput = $("#comedian-input").val().trim();
        $("#comedian-buttons").append($("<button>").text(userInput).attr("data-comedian", userInput));
    });

    $(document.body).on("click", "button", function () {
        let comedian = $(this).attr("data-comedian");
        let queryURL = `https://api.giphy.com/v1/gifs/search?q=${comedian}&rating=pg-13&api_key=6ZeamDEjwOxFhJbpwk38OTWcKlLZvi8E&limit=10`;


        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {

                for (var i = 0; i < response.data.length; i++) {
                    let newDiv = $("<figure>");
                    let gif = $("<img>");
                    gif.attr("src", response.data[i].images.fixed_width_still.url);
                    let rtg = $("<figcaption>").text(`Rating:  ${response.data[i].rating.toUpperCase()}`);
                    rtg.addClass("cap");
                    gif.append(rtg);
                    newDiv.append(gif);
                    newDiv.append(rtg);
                    $("#comedians").prepend(newDiv);
                    // allows css class target to get all the images inline--rather than one per line (with display: inline-block)
                    newDiv.addClass("gifImages");
                }
            });
    });
    $(document.body).on("click", "img", function () {
        imageSrc = (this).src;
        let stillPart = imageSrc.slice(-6, -4);
        if (stillPart == "_s") {
            // splice out the _s
            let newSrc = imageSrc.slice(0, -6) + imageSrc.slice(-4);
            $(this).attr("src", newSrc);
        } else {
            // add the _s back in
            let stillSrc = imageSrc.slice(0, -4) + "_s" + imageSrc.slice(-4);
            $(this).attr("src", stillSrc);
        }

    });


});