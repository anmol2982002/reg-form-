// requiring necessary modules.
const express = require("express");
const hbs = require("hbs");
const app = express();
const path = require("path");

// This is the minimum needed to connect the myapp database running locally on the default port (27017).
require("./db/conn");


app.use(express.json());   // exporting data in JSON format
app.use(express.urlencoded({ extended: false }));
const Register = require("./models/register");
const port = 5000;

const static_path = path.join(__dirname, "../public");   // join method joins paths into one path
const template_path = path.join(__dirname, "../src/templates/views");
const partials_path = path.join(__dirname, "../src/templates/partials");

// The app.use() function is used to mount the specified middleware function
app.use(express.static(static_path));   // build in middleware used to render entire HTML file


// The app.set() function is used to assigns the setting name to value. You may store any value that you want, but certain names can be used to configure the behavior of the server.
app.set("view engine", "hbs");
app.set("views", template_path);

hbs.registerPartials(partials_path);  // registerPartials provides a quick way to load all partials from a specific directory

app.get("/", (req, res) => {        // app.get(): This function tells the server what to do when get requests at a given route.
  res.render("index");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/register", (req, res) => {
  res.render("register");
});

// The app.post() function routes the HTTP POST requests to the specified path with the specified callback functions.
app.post("/register", async (req, res) => {
  // console.log("enter");
  try {
    const password = req.body.password;
    const cpassword = req.body.confirmpassword;
    if (password === cpassword) {
      const registeremployee = new Register({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        gender: req.body.gender,
        phone: req.body.phone,
        age: req.body.age,
        password: req.body.password,
        confirmpassword: req.body.confirmpassword,
      });
      const registered = await registeremployee.save();
      res.status(201).render("index");
    } else {
      res.status(400).send("error passwords are not matching");
    }
  } catch (err) {
    res.status(400).json({ message: "some error while filling the data" });
  }
});

// The app.listen() function is used to bind and listen the connections on the specified host and port
app.listen(port, () => {
  console.log("server is established");
});
