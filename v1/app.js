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
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create({
//     name: "Nandi Trek",
//     image: "https://images.thrillophilia.com/image/upload/s--FC4na6bC--/c_fill,f_auto,fl_strip_profile,g_center,h_642,q_auto,w_1280/v1/images/photos/000/041/116/original/Trekking_in_India.jpg.jpg",
//     description: "Beautiful. Serene. Untouched."
// }, function(err, campground){
//     if(err){
//         console.log(err);
//     } else {
//         console.log(campground);
//         console.log("newly created");
//     }
// });


app.get("/", function(req, res){
    res.render("landing");
});
//INDEX-Show all campgrounds
app.get("/campgrounds", function(req, res){
    //Get all campgrounds from db
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
          res.render("index", {campgrounds: allCampgrounds});      
        }
    });
    //Render the files
})
//CREATE-Add new Camp to DB
app.post("/campgrounds", function(req, res){
    //get data from form and add to db
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc};
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
});
//NEW-Show form to create new camp
app.get("/campgrounds/new", function(req, res){
    res.render("new");
});
//SHOW-Show the clicked object info
app.get("/campgrounds/:id", function(req, res){
    //find the campground with id 
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
                //render show template with that camp ground
                res.render("show", {campground: foundCampground});
        }
    });  
});
app.listen(3000, function(){
    console.log("The yelpcamp server has started");
});