const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Blog = require("./models/blog");
const fileUpload = require("express-fileupload");
var blogs;

// Connecting To DataBase
mongoose
    .connect(
        "mongodb+srv://node_app:bassem011@cluster0.2iabr.mongodb.net/blog?retryWrites=true&w=majority", {
            useUnifiedTopology: true,
        }, {
            useNewUrlParser: true,
        }
    )
    .then(() => app.listen(process.env.PORT || 3000))
    .catch((err) => console.log(err));

// Getting Data From Database
Blog.find((err, result) => {
    if (err) {
        throw err;
    } else {
        blogs = result;
    }
});
//  rendering Pug Files
app.set("view engine", "pug");

//serving static files
app.use(express.static("public"));

// Routing rendered views
app.get("/", (req, res) => {
    res.render("index", {
        title: "Home",
        blogs,
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About",
    });
});
app.get("/posts/:id", (req, res) => {
    var findIndex = blogs.findIndex((post) => post._id == req.params.id);
    if (blogs.includes(blogs.find((post) => post._id == req.params.id))) {
        res.render("post", {
            blog: blogs[findIndex],
            next: findIndex + 1,
            prev: findIndex,
            blogs,
        });
    } else {
        res.status(404).render("404");
    }
});

app.use(fileUpload());

app.post("/upload", function(req, res) {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send("No files were uploaded.");
    }
    let sampleFile = req.files.sampleFile;

    sampleFile.mv(`${__dirname}/public/images/${sampleFile.name}`, function(
        err
    ) {
        if (err) return res.status(500).send(err);

        res.send("File uploaded!");
    });
});

app.use((req, res) => {
    res.status(404).render("404");
});