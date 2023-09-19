const express = require("express");
const router = express.Router();
const db = require("../model/helper");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

// Functions to fetch data from Google API and database -- USED IN ROUTER FUNCTIONS

// Used for FE search input BY TITLE
const searchGoogleBooksByTitle = async (req, res) => {
  try {
    const { title } = req.body;
    const result = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=intitle:${title}`
    );
    if (!result.ok) {
      setError(`An error has occured: ${response.status}`);
    } else {
      let data = await result.json();
      res.send(data);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Used for FE search input BY AUTHOR
const searchGoogleBooksByAuthor = async (req, res) => {
  try {
    const { author } = req.body;
    const result = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=inauthor:${author}`
    );
    if (!result.ok) {
      setError(`An error has occured: ${response.status}`);
    } else {
      let data = await result.json();
      res.send(data);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// GET ALL ITEMS FROM DATABASE -- used in other router functions to update database content in front end
const getItems = async (req, res) => {
  try {
    const result = await db(`SELECT * FROM mylibrary`);
    console.log(result);
    const items = result.data;
    res.send(items);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// ROUTER FUNCTIONS

// GET BOOK DATA BASED ON SEARCH BY TITLE -- Used in Search component, search field -- FROM GOOGLE BOOKS API
// working in postman
router.post("/mylibrary/searchByTitle", async (req, res) => {
  try {
    searchGoogleBooksByTitle(req, res); //function written line 32
  } catch (err) {
    res.status(500).send(err);
  }
});

/* GET home page in backend. */
router.get("/", function (req, res, next) {
  // res.send({ title: "My Library App" });
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

module.exports = router;
