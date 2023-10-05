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
      res
        .status(200)
        .send({ message: "Login successful, here is your token", token });
    } else {
      throw new Error("User not found");
    }
  } catch (err) {
    res.status(401).send({ error: err.message });
  }
});

/*********  PRIVATE ROUTE FOR LOGGED IN USERS ONLY *********/
// This is working in postman
router.get("/mylibrary", ensureUserLoggedIn, (req, res) => {
  res.status(200).send({
    message: "Here is the PROTECTED data for user " + req.user_id,
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
  // get book data via LEFT JOIN to junction books_users and mylibrary table
  try {
    let user = res.locals.user;
    let sql = `SELECT users.*, books.*, 
        users.id AS userId,
        books.id AS libraryId
        FROM users
        LEFT JOIN user_books
        ON users.id = user_books.user_id
        LEFT JOIN books
        ON user_books.book_id = books.id
        WHERE users.id = ${user};`;

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
// Used in Search component.
// Adds books to overal mylibrary and books_users, but only for 1 user.
// if another user wants to add, shows duplicate entry error. How avoid?
// NB - Need to pass userId when calling function on front-end
// router.post("/userlibrary/:id", ensureUserExists, async (req, res) => {
//   const { bookId } = req.body;
//   let uId = res.locals.user;
//   const sql = `INSERT INTO mylibrary (bookId) VALUES ("${bookId}");
//   SELECT LAST_INSERT_ID();`;
//   try {
//     let results = await db(sql);
//     let newBookId = results.data[0].insertId;
//     if (uId) {
//       let vals = [];
//       vals.push(`(${newBookId}, ${uId})`);
//       let sql = `INSERT INTO books_users (bId, uId)
//       VALUES ${vals.join(",")}`;
//       await db(sql);
//     }
//     await getUserItems(req, res);
//   } catch (err) {
//     res.status(500).send({ error: err.message });
//   }
// });

// // DELETE ITEM BY ID PER USER -- Used in MyUsersLibrary page.
// // Working on postman. Removing book via libraryId. NotGoogleBookId.
// // NB - Need to pass uId on front-end
// router.delete("/userlibrary/:id", ensureUserExists, async (req, res) => {
//   let uId = res.locals.user;
//   //const { bookToDelete } = req.body;
//   let bookToDelete = 31;
//   try {
//     await db(
//       `DELETE FROM books_users WHERE bId = ${bookToDelete} AND uId = ${uId};`
//     );
//     await getUserItems(req, res);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

module.exports = router;
