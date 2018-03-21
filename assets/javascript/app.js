var topics = ["Serval", "Hippo", "Racoon", "Penguin"];

var search;

for (var i = 0; i < topics.length; i++) {
    var button = $("<button>");
    button.attr("id", topics[i]);
    button.text(topics[i]);
    $(".buttons").append(button);
}

function getImages(response) {
    for(var i = 0; i < response.data.length; i++) {
        imgUrl = response.data[i].images.fixed_height_still.url;
        $(".images").append("<img src = '" + imgUrl + "'>");
    }

}

$("body").on("click", "button", function () {
    search = $(this).attr("id");
    queryUrl = "http://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=Yo0rOAAf2vBTMa0CxQhiUqlwxPM62uBQ&limit=10"
    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function (response) {
        $(".images").empty();
        getImages(response);
    });
});

$("body").on("click", "img", function() {
    if(!$(this).hasClass("animated")) {
        var url = $(this).attr("src");
        console.log(url);
        url = url.substring(0, url.length-6) + ".gif";
        $(this).attr("src",url);
        $(this).addClass("animated");
    }
    else {
        var url = $(this).attr("src");
        url = url.substring(0, url.length-4) + "_s.gif";
        $(this).attr("src",url);
        $(this).removeClass("animated");
    }
});