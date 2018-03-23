var topics = ["Serval", "Hippo", "Asian Small-clawed Otter", "Jaguar", "Crested Ibis", "Alpaca", "Raccoon", "Fennec Fox", "American Beaver", "Prairie Dog", "Lion", "Moose", "Shoebill", "Northern White-face Owl", "Eurasian Eagle Owl", "Margay", "Penguin", "Silver Fox", "Ezo Red Fox", "Campo Flicker", "Gray Wolf", "Reticulated Giraffe", "Golden Snub-nosed Monkey", "Brown Bear", "African Wild Dog"];

var search = "";
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
        var animate = response.data[i].images.fixed_height.url;
        var imgDisplay = $(`<div class="display">`);
        var rating = response.data[i].rating;
        imgDisplay.append(`<div>Rating: "${rating}"</div>`);
        var image = $("<img>");
        image.attr("src",imgUrl);
        image.data("still",imgUrl);
        image.data("animate",animate);
        image.data("state","still");
        imgDisplay.append(image);
        $(".images").append(imgDisplay);
    }

}

function doAjax(searchTerm) {
    queryUrl = `https://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=Yo0rOAAf2vBTMa0CxQhiUqlwxPM62uBQ&limit=${count}`;
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
    if(search !== "") {
        count += 10;
        doAjax(search);
    }
});

$("body").on("click", "img", function() {
    var state = $(this).data("state");
    if(state === "still") {
        var animate = $(this).data("animate");
        $(this).attr("src",animate);
        $(this).data("state","animate");;
    }
    else if(state === "animate") {
        var still = $(this).data("still");
        $(this).attr("src",still);
        $(this).data("state","still");
    }
});

$("#add-animal").on("click", function (event) {
    event.preventDefault();

    var input = $("#animal-input").val();
    topics.push(input);
    buttons();
});