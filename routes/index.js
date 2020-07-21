const express = require("express");
const router = express.Router();

const Event = require("../models/Event");

router.get("/", function(req, res, next) {
  if (req.session.spslogin) {
    res.render("list", {
      title: "Etkinlik Listesi",
      session: req.session
    });
  } else {
    res.render("login", {
      title: "Giriş Yap",
      session: req.session
    });
  }
  //res.render("index", { title: "Home", session: req.session });
});

router.get("/etkinlik", function(req, res, next) {
  if (req.session.spslogin) {
    Event.find({}, (err, data) => {
      res.render("list", {
        title: "Etkinlik Listesi",
        session: req.session,
        eventList: data
      });
    });
  } else {
    res.render("login", {
      title: "Giriş Yap",
      session: req.session
    });
  }
});

router.get("/yeni-etkinlik", function(req, res, next) {
  if (req.session.spslogin) {
    res.render("panel", { title: "Etkinlik Oluştur", session: req.session });
  } else {
    res.redirect("/login");
  }
});

module.exports = router;
