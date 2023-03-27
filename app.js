//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const { forEach, lowerCase } = require("lodash");

const homeStartingContent = "adipiscing.";
const aboutContent = "tincidunt dui.";
const contactContent = "nam libero.";

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
const posts = [];

app.get("", function(req, res){
  res.render("home", {p_data: homeStartingContent, posts:posts});
});

app.get("/about", function(req, res){
  res.render("about",{aboutContent:aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact",{contactContent: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.get("/posts/:title",function(req, res){
  let requestedtitle = lowerCase(req.params.title);

  posts.forEach(function(post){
    const storedTitle = lowerCase(post.title);
    if(storedTitle === requestedtitle){
      res.render("post",{post_title : post.title, post_content : post.content});
    }
  });

});

app.post("/compose", function(req, res){
  const post = {
    title: req.body.datatitle,
    content: req.body.databody
  };
  posts.push(post);
  res.redirect("/");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
