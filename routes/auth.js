const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const passport = require("passport");
const User = require("../models/user");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");

const router = express.Router();

//회원가입은 동일
router.post("/join", isNotLoggedIn, async (req, res, next) => {
  const { email, password, nick } = req.body;
  try {
    const exUser = await User.findOne({ where: { email: email } });
    if (exUser) {
      const message = encodeURIComponent("이미 있는 이메일입니다");
      return res.redirect(`/?error=${message}`);
    }
    const hash = await bcrypt.hash(password, 12);
    await User.create({
      email,
      nick,
      password: hash,
    });
    return res.redirect("/");
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post("/login", isNotLoggedIn, (req, res, next) => {
  passport.authenticate("local", { session: false }, (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      return res.redirect(`/?error=${info.message}`);
    }
    return req.login(user, { session: false }, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      const token = jwt.sign({ id: user.id, email: user.email, nick: user.nick }, process.env.JWT_SECRET, { expiresIn: "7d" });
      return res
        .cookie("user", token, {
          maxAge: 1000 * 60 * 60 * 24 * 7, // 7일간 유지
          httpOnly: true,
        })
        .redirect("/");
    });
  })(req, res, next);
});

//아직 안 만들었음
router.get("/logout", isLoggedIn, (req, res) => {
  req.logout();
  res.cookie("user", "").redirect("/");
});

module.exports = router;
