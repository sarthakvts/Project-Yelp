var express = require("express");
var app = express();
app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    var campgrounds = [
        {name: "Tso Moriri", image:"https://upload.wikimedia.org/wikipedia/commons/3/3b/TsoMoririLake.jpg"},
        {name: "Camp Exotica", image:"https://cf.bstatic.com/images/hotel/max1280x900/206/206398378.jpg"},
        {name: "Rishikesh valley", image:"https://pix10.agoda.net/hotelImages/215/2155672/2155672_17040414480052114466.jpg?s=1200x800"},
        {name: "Dehradun", image:"https://www.thegreatnext.com/uploads/trip_media/itinerary_1-620.jpg"}
    ]
    res.render("campgrounds", {campgrounds:campgrounds});
})

app.listen(3000, function(){
    console.log("The yelpcamp server has started");
});