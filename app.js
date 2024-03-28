require('dotenv').config();

const express = require('express');
const app = express();


const bcryptjs = require("bcryptjs");
const bcrypt = require('bcrypt');

const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;

require("./db/connection.js");

const Signup = require("./models/model.js");

const path = require('path');
const publicPath = path.join(__dirname, "/public");
app.use(express.static(publicPath));

app.set("view engine", "hbs");

const viewPath = path.join(__dirname , "/viewsHBS");
app.set("views", viewPath);

app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.render("signup");
})

app.get("/signup.html", (req, res) => {
    res.render("signup");
})

app.post("/signup", async (req, res) => {
    try {
        const Data = new Signup({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })

        const storeData = await Data.save();
        res.json("Data store succesfully!");

    } catch (error) {
        res.send("Invalid Details!");
    }
})

app.get("/Loginpage.html", (req, res) => {
    res.render("login");
})

app.post("/login", async (req, res) => {
    try {
        const emailDiff = req.body.email;
        const password = req.body.password;
        const Storage = await Signup.findOne({ email: emailDiff });
        const isMatch = await bcrypt.compare(password,Storage.password);
        if (isMatch) {
            res.render("success");
        }
        else {
            res.send("Invalid Login Details!");
        }
    } catch (error) {
        res.send("Invalid LoginId!");
    }
})

app.listen(port, () => {
    console.log(`You are listing on port ${port}`);
})

