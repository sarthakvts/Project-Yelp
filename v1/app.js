var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"), 
    mongoose = require("mongoose")

    mongoose.set('useNewUrlParser', true);
    mongoose.set('useUnifiedTopology', true);
    mongoose.connect("mongodb://localhost/yelp_camp");
    app.set("view engine", "ejs");
    app.use(bodyParser.urlencoded({extended: true}));

//Schema Setup
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String
});

var Campground = mongoose.model("Campground", campgroundSchema);



app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    //Get all campgrounds from db
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
          res.render("campgrounds", {campgrounds: allCampgrounds});      
        }
    });
    //Render the files
})

app.post("/campgrounds", function(req, res){
    //get data from form and add to campground array
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
});

app.get("/campgrounds/new", function(req, res){
    res.render("new.ejs");
});
app.listen(3000, function(){
    console.log("The yelpcamp server has started");
});