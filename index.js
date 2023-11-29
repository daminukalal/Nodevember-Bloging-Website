const express=require("express");
const bodyParser=require("body-parser")
const mongoose = require("mongoose")
const blogPostsArray=require("./data");
require("dotenv").config();

const app = express();

app.set('view engine', 'ejs');

//if css file does not work then create one folder and 
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
const mongodbURL = process.env.MONGO_URL;

const MONGO_URL ="mongodb+srv://daminikalal2003:damini123@cluster0.7hoevsg.mongodb.net/Nodevember"

mongoose.connect(MONGO_URL)
.then(()=>{
    console.log("DB Connected Successfully");

})
.catch((err)=>{
    console.log("Error occured at DB connection",err);

});

const blogSchema = new mongoose.Schema({
    title: String,
    imageURL:String,
    description: String

});
const Blog = new mongoose.model("blog",blogSchema);

app.get("/",(req,res)=>{
    Blog.find({})
    .then((arr)=>{
        res.render("index",{blogPostsArray:arr})
       
    })
    .catch((err)=>{
        console.log("Cannot find blog");

        res.render("404");
    
    });
    
        // res.render("index",{blogPostsArray:blogPostsArray})
  
})

app.get("/contact",(req,res)=>{
    res.render("contact")
})

app.get("/about",(req,res)=>{
    res.render("about")
})

app.get("/compose",(req,res)=>{
    res.render("compose")
})
app.post("/compose",(req,res)=>{
   
    const image=req.body.imageURL
    const title=req.body.title
    const description=req.body.description

    const newBlog = new Blog({
        imageURL:image,
        title:title,
        description:description
    })
    newBlog.save()
    .then(()=>{
        console.log("Blog posted successfully");
    
    })
    .catch((err)=>{
        console.log("Error posting succesfully",err);
    
    });
 
    res.redirect("/")
})

app.get("/post/:id",(req,res)=>{
    console.log(req.params.id)

    const id=req.params.id;
    
    Blog.findOne({_id:id})
    .then((item)=>{
        res.render("post",{post:item})
        }
       
    )
    .catch((err)=>{
        console.log("Cannot find blog");

        res.render("404");
    
    });


})

app.get("/delete/:id",(req,res)=>{
    console.log(req.params.id)

    const id=req.params.id;

    Blog.deleteOne({_id:id})
    .then((arr)=>{
        res.redirect("/")
       
    })
    .catch((err)=>{
        console.log("Cannot find blog");

        res.render("404");
    
    });
    
 
})


// app.get("/about",(req,res)=>{
//     res.sendFile(__dirname + "/about.html");
// })

// app.get("/compose",(req,res)=>{
//     res.sendFile(__dirname + "/compose.html");
// })

// app.get("/post",(req,res)=>{
//     res.sendFile(__dirname + "/post.html");
// })
const port = 3000 || process.env.PORT;
app.listen(3000 , ()=>{
    console.log("Server is listening on port 3000");
})