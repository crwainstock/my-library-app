var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");

var indexRouter = require("./routes/index");
// var usersRouter = require("./routes/users");

var app = express();

app.use(cors()); // add after 'app' is created

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public"))); // This deploys the backend html file
app.use(express.static(path.join(__dirname, "/client/dist"))); //Added per CodeOp instructions
app.use(cors());

app.use("/", indexRouter);
app.use("/users", usersRouter);

// Added per CodeOp instructions for heroku deployment
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/dist/index.html"));
});

module.exports = app;
