const express = require("express");
const router = express.Router();
const db = require("../model/helper");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

/* GET home page in backend. */
router.get("/", function (req, res, next) {
  // res.send({ title: "My Library App" });
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// 💡💡 Functions to fetch data from Google API and database -- USED IN ROUTER FUNCTIONS

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

// Used for FE search input BY ID
const searchGoogleById = async (req, res) => {
  try {
    const { id } = req.body;
    const result = await fetch(
      `https://www.googleapis.com/books/v1/volumes/${id}`
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

// Get all items from database -- used in other router functions to update database content in front end
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

// 💡💡 ROUTER FUNCTIONS

// GET ALL LIBRARY ITEMS FROM DATABASE -- working in postman
router.get("/mylibrary", async (req, res) => {
  try {
    // let results = await db(`SELECT * FROM mylibrary;`);
    await getItems(req, res);
    console.log(results);
    res.send(results.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

// SEARCH GOOGLE BOOKS API BY AUTHOR -- working in postman
router.post("/mylibrary/searchByAuthor", async (req, res) => {
  try {
    searchGoogleBooksByAuthor(req, res); //function written line 50
  } catch (err) {
    res.status(500).send(err);
  }
});

// SEARCH GOOGLE BOOKS API BY TITLE -- working in postman
router.post("/mylibrary/searchByTitle", async (req, res) => {
  try {
    searchGoogleBooksByTitle(req, res); //function written line 32
  } catch (err) {
    res.status(500).send(err);
  }
});

// SEARCH GOOGLE BOOKS API BY ID -- working in postman
router.post("/mylibrary/searchById", async (req, res) => {
  try {
    searchGoogleById(req, res); //function written line 14
  } catch (err) {
    res.status(500).send(err);
  }
});

//GET ITEM BY ID FROM DATABASE -- used in BookDetailView with rendering reviews from database
router.get("/mylibrary/:id", async (req, res) => {
  try {
    let results = await db(
      `SELECT * FROM mylibrary WHERE id=${req.params.id} ORDER BY id ASC;`
    );
    res.send(results.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

// ADD ITEMS TO LIBRARY -- Used in Search component -- working in postman
router.post("/mylibrary", async (req, res) => {
  const { bookId } = req.body;
  const sql = `INSERT INTO mylibrary (bookId) VALUES ("${bookId}")`;

  try {
    await db(sql);
    await getItems(req, res);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

//UPDATE REVIEW -- Used in BookDetailView page
router.put("/mylibrary/:id", async (req, res) => {
  const { review } = req.body;
  const id = req.params.id;
  const sql = `UPDATE mylibrary SET review = "${review}" WHERE id = ${id}`;

  try {
    await db(sql);
    getItems(req, res);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// DELETE ITEM BY ID -- Used in MyLibrary page
router.delete("/mylibrary/:id", async (req, res) => {
  let id = Number(req.params.id);
  try {
    await db(`DELETE FROM mylibrary WHERE id = ${id}`);
    await getItems(req, res);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
