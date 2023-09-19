const express = require("express");
const router = express.Router();
const db = require("../model/helper");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

/* GET home page. */
router.get("/", function (req, res, next) {
  // res.send({ title: "My Library App" });
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

module.exports = router;
