//jshint esversion:6

const express = require("express");
const mongoose=require("mongoose");


var c=require("lodash");

const bodyParser = require("body-parser");
const ejs = require("ejs");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();
var newpost=[];

app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

main().catch(err => console.log(err));
async function main() {


 mongoose.connect("mongodb://127.0.0.1:27017/blogdb").catch((err)=>{if(err)
{
  console.log(" not connected");
}});
// creating schema

const { Schema } = mongoose;
const blogSchema = new Schema({
  title: {type:String,
  required:[true,""]}, // String is shorthand for {type: String}
  content:String});
  const blog = mongoose.model('Blog', blogSchema);
  const blogpost=await blog.find();
  console.log(blogpost);






app.get("/" ,function(req,res)
{
  res.render("home",{home_content:homeStartingContent,newpost:blogpost});
});
app.get("/about" ,function(req,res)
{
  res.render("about",{about_content:aboutContent})
});
app.get("/contact" ,function(req,res)
{
  res.render("contact",{about_content:aboutContent})
});
app.get("/compose" ,function(req,res)
{
  res.render("compose");
});
app.post("/compose",async function(req,res)
{const title=req.body.postTitle
  const bloger=req.body.blog;
  console.log(req.body);
  const data= new blog({
    title:title,
    content:bloger
  });
  await data.save();
  blogpost.push(data)
  console.log(data.content);



  res.redirect("/");

});
app.get("/posts/:topic",async function(req,res){
  
  var b=req.params.topic;
  console.log(b);
 const showpost= await blog.findOne({_id:b});
 console.log(showpost);
  
  
   res.render("post" ,{titlepost:showpost.title,titlecontent:showpost.content});
 
});













app.listen(3000, function() {
  console.log("Server started on port 3000");
});}
