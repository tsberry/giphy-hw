var topics = ["Serval", "Hippo", "Asian Small-clawed Otter", "Jaguar", "Crested Ibis", "Alpaca", "Raccoon", "Fennec Fox", "American Beaver", "Prairie Dog", "Lion", "Moose", "Shoebill", "Northern White-face Owl", "Eurasian Eagle Owl", "Margay", "Penguin", "Silver Fox", "Ezo Red Fox", "Campo Flicker", "Gray Wolf", "Reticulated Giraffe", "Golden Snub-nosed Monkey", "Brown Bear", "African Wild Dog"];

var search;
var count;

function buttons() {
    $(".buttons").empty();
    for (var i = 0; i < topics.length; i++) {
        var button = $("<button>");
        button.attr("id", topics[i]);
        button.attr("type","button");
        button.addClass("btn btn-primary animal-button");
        button.text(topics[i]);
        $(".buttons").append(button);
    }
}


function getImages(response) {
    for(var i = 0; i < response.data.length; i++) {
        var imgUrl = response.data[i].images.fixed_height_still.url;
        var imgDisplay = $("<div class='display'>");
        var rating = response.data[i].rating;
        imgDisplay.append("<div>Rating: " + rating + "</div>");
        imgDisplay.append("<img src = " + imgUrl + ">");
        $(".images").append(imgDisplay);
    }

}

function doAjax(searchTerm) {
    queryUrl = "http://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=Yo0rOAAf2vBTMa0CxQhiUqlwxPM62uBQ&limit=" + count;
    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function (response) {
        $(".images").empty();
        getImages(response);
    });
}

buttons();

$("body").on("click", ".animal-button", function () {
    count = 10;
    search = $(this).attr("id");
    doAjax(search);
});

$("body").on("click", "#add-button", function () {
    count += 10;
    doAjax(search);
    console.log(count);
});

$("body").on("click", "img", function() {
    if(!$(this).hasClass("animated")) {
        var url = $(this).attr("src");
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

$("#add-animal").on("click", function (event) {
    event.preventDefault();

    var input = $("#animal-input").val();
    topics.push(input);
    buttons();
});