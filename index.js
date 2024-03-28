const express = require("express");
const passport = require("passport");
const ejs = require("ejs");
const path = require("path");
const bcrypt = require("bcrypt");
const bcryptjs =  require('bcryptjs');

const User = require("./models/passModel");
const { intitializingPassport, isAuthenticated } = require("./passportConfig");
require("./db/passConnection");

const index = express();
const port = process.env.PORT || 8080;

// Set view engine and static folder
index.set("view engine", "ejs");
index.use(express.static(path.join(__dirname, "/public")));

// Middleware
index.use(express.json());
index.use(express.urlencoded({ extended: true }));

// Session setup
index.use(require("express-session")({
    secret: "TOP",
    resave: false,
    saveUninitialized: true
}));

// Passport initialization
intitializingPassport(passport);
index.use(passport.initialize());
index.use(passport.session());

// Routes
index.get("/", (req, res) => {
    res.render("signup");
});

index.get("/success",(req,res)=>{
    res.render("success");
});

index.get("/signup", (req, res) => {
    res.render("signup");
});

index.post("/signup", async (req, res) => {
    try {
        const existingUser = await User.findOne({ username: req.body.username });
        if (existingUser) {
            return res.status(400).send("User already exists");
        }
        const newUser = await User.create(req.body);
        res.json("You are successfully signed up!");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

index.get("/login", (req, res) => {
    res.render("login");
});

index.post("/login", passport.authenticate("local", {
    failureRedirect: "/login", 
    successRedirect: "/success"
}));

index.get("/p", isAuthenticated, (req, res) => {
    res.send(req.user);
});

index.get("/logout", (req, res) => {
    req.logOut();
    res.redirect("/login");
});

// Start server
index.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
