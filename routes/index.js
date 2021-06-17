const express = require("express");
const { isLoggedIn, isNotLoggedIn, noMatter } = require("./middlewares");

const router = express.Router();

router.get("/", noMatter, (req, res, next) => {
  res.render("index", { user: req.user });
});

router.get("/test", isLoggedIn, (req, res, next) => {
  res.render("test", { user: req.user });
});

module.exports = router;
