// This is the more modern syntax for importing express, but I couldn't get it to work here yet.
// import express from "express";

const express = require("express");
const router = express.Router();
const db = require("../model/helper");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const ensureUserLoggedIn = require("../guards/ensureUserLoggedIn");
const ensureUserExists = require("../guards/ensureUserExists");
const bcrypt = require("bcrypt");
const saltRounds = 7;
const supersecret = process.env.SUPER_SECRET;

const getUserItems = async (req, res) => {
  try {
    const results = await db("SELECT * FROM user_books;");
    res.status(200).send(results.data);
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
};

// To get all users for testing
async function sendAllUsers(res) {
  let results = await db("SELECT * FROM users ORDER BY id");
  res.send(results.data);
}

/* GET all users. For testing  -- working in postman */
router.get("/all", function (req, res, next) {
  try {
    sendAllUsers(res);
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
});

/*GET all info from junction table user_books. For testing -- working in Postman*/
router.get("/books", async (req, res) => {
  try {
    const results = await db("SELECT * FROM user_books;");
    res.status(200).send(results.data);
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
});

// REGISTER NEW USERS -- working in postman, no frontend yet
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    //we hash the password (encrypt it) using bcrypt
    const hashedPWD = await bcrypt.hash(password, saltRounds);

    //insert the new user and encrypted password on db
    await db(
      `INSERT INTO users (username, password) VALUES ("${username}", "${hashedPWD}")`
    );

    res.status(200).send({ message: "Register successful" });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

/*********  LOGIN  *********/
// LOGIN -- working in postman, working in frontend
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    //find on the DB the user that tries to login
    const results = await db(
      `SELECT * FROM users WHERE username = "${username}"`
    );
    const user = results.data[0];

    //if user is found on DB
    if (user) {
      //check if password submitted through the form matches the one stored in DB
      //use bcrypt cause stored password is encrypted
      const correctPassword = await bcrypt.compare(password, user.password);

      //if not matching
      if (!correctPassword) throw new Error("Incorrect password");

      //else, create and send token
      const token = jwt.sign({ user_id: user.id }, supersecret);
      const userId = user.id;
      res.status(200).send({
        message: "Login successful, here is your token",
        token,
        userId,
      });
    } else {
      throw new Error("User not found");
    }
  } catch (err) {
    res.status(401).send({ error: err.message });
  }
});

/*********  PRIVATE ROUTE FOR LOGGED IN USERS ONLY *********/
// This is working in postman
router.get("/userlibrary", ensureUserLoggedIn, (req, res) => {
  res.status(200).send({
    message: "Here is the PROTECTED data for user " + req.user_id,
    userId: req.user_id,
  });
});

//Convert "/library/:id" DB results into a useful JSON format: user obj with nested array of book objs.
function joinToJson(results) {
  // Get first row
  let row0 = results.data[0];
  // Create array of book objs
  let books = [];
  if (row0.libraryId) {
    books = results.data.map((b) => ({
      bookId: b.bookId, //mylibrary table GoogleBookId
      libraryId: b.libraryId, //mylibrary table book id
      rating: b.rating, //mylibrary rating
      review: b.review, //mylibrary review
    }));
  }
  // Create user obj
  let user = {
    uId: row0.userId, //users table id
    books,
  };
  return user;
}

/**
 * Routes
 **/

//
//Multi-user func related routes
//

// GET user-specific library info
router.get("/userlibrary/:id", ensureUserExists, async function (req, res) {
  // check user exists via ensureUserExists guard
  // & store user id in res.locals.user
  // get book data via LEFT JOIN to junction user_books and mylibrary table
  try {
    let user = res.locals.user;
    let sql = `SELECT users.*, books.*, reviews.*,
    users.id AS userId,
    books.id AS libraryId,
    reviews.text AS review
    FROM users
    LEFT JOIN user_books
    ON users.id = user_books.user_id
    LEFT JOIN books
    ON user_books.book_id = books.id
    LEFT JOIN reviews
    ON users.id = reviews.user_id AND user_books.book_id
    WHERE users.id = ${user}`;

    // ORIGINAL MYSQL FOR TABLES WITHOUT REVIEWS
    // let sql = `SELECT users.*, books.*,
    //         users.id AS userId,
    //         books.id AS libraryId
    //         FROM users
    //         LEFT JOIN user_books
    //         ON users.id = user_books.user_id
    //         LEFT JOIN books
    //         ON user_books.book_id = books.id
    //         WHERE users.id = ${user};`;

    let results = await db(sql);
    userlib = joinToJson(results);
    res.status(200).send(userlib);
    console.log(`results: ${JSON.stringify(results)}`);
    return;
  } catch (err) {
    console.error("Error occurred in /userlibrary/:id route:", err);
    res.status(500).send({
      error: "An error occurred while processing your request.",
      errorMessage: err.message,
      errorStack: err.stack,
    });
  }
});
// ADD ITEMS TO LIBRARY PER USER.
// Used in Search component. Needs something to make sure duplicate books aren't added to the books table
router.post("/userlibrary/:id", ensureUserExists, async (req, res) => {
  const { bookId } = req.body;
  let uId = res.locals.user;
  const sql = `INSERT INTO books (bookId) VALUES ("${bookId}");
  SELECT LAST_INSERT_ID();`;
  try {
    let results = await db(sql);
    let newBookId = results.data[0].insertId;
    if (uId) {
      let vals = [];
      vals.push(`(${newBookId}, ${uId})`);
      let sql = `INSERT INTO user_books (book_id, user_id)
      VALUES ${vals.join(",")}`;
      await db(sql);
    }
    await db(
      `INSERT INTO reviews (user_id, book_id, text) VALUES (${uId}, ${newBookId}, '');`
    );
    await getUserItems(req, res);
  } catch (err) {
    console.error("Error occurred in /userlibrary/:id post route:", err);
    res.status(500).send({
      error: "An error occurred while processing your request.",
      errorMessage: err.message,
      errorStack: err.stack,
    });
  }
});

// DELETE ITEM BY ID PER USER
// deletes book from user_books table, but not books table...not sure if that needs to happen, too. we'll see.
router.delete("/userlibrary/:id", ensureUserExists, async (req, res) => {
  let uId = res.locals.user;
  const { bookToDelete } = req.body;

  try {
    await db(
      `DELETE FROM user_books WHERE book_id = ${bookToDelete} AND user_id = ${uId};`
    );
    await db(
      `DELETE FROM reviews WHERE book_id = ${bookToDelete} AND user_id = ${uId};`
    );
    await db(`DELETE FROM books WHERE id = ${bookToDelete};`);
    await getUserItems(req, res);
  } catch (err) {
    console.error("Error occurred in /userlibrary/:id delete route:", err);
    res.status(500).send({
      error: "An error occurred while processing your request.",
      errorMessage: err.message,
      errorStack: err.stack,
    });
  }
});

//UPDATE BOOK REVIEWS/NOTES
router.put("/userlibrary/:id", async (req, res) => {
  const { review, bookId } = req.body;
  const id = req.params.id;

  try {
    await db(
      `UPDATE reviews SET text = "${review}" WHERE user_id = ${id} AND book_id = ${bookId};`
    );

    await getUserItems(req, res);
  } catch (err) {
    console.error("Error occurred in /userlibrary/:id delete route:", err);
    res.status(500).send({
      error: "An error occurred while processing your request.",
      errorMessage: err.message,
      errorStack: err.stack,
    });
  }
});

module.exports = router;
