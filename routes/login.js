const express = require("express");
const router = express.Router();
const config = require("../config");
const { cfusername, cfpassword } = config;

router.get("/", function(req, res, next) {
  if (req.session.spslogin) {
    res.redirect("/etkinlik");
  } else {
    res.render("login", { title: "Giriş Yap", session: req.session });
  }
});

router.post("/", function(req, res) {
  const user_name = req.body.user;
  const password = req.body.password;
  if (user_name === cfusername && password === cfpassword) {
    req.session.spslogin = true;
    res.render("panel", {
      title: "Etkinlik Oluştur",
      session: req.session
    });
  } else {
    console.log("no login");
    res.render("login", {
      title: "Giriş Yap",
      message: "Bilgiler Hatalı.",
      session: req.session
    });
  }
});

router.get("/exit", function(req, res) {
  req.session.destroy();
  res.redirect("/login");
});

module.exports = router;
