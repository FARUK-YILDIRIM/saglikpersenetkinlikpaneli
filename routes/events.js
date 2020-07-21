const express = require("express");
const router = express.Router();

const Event = require("../models/Event");

router.put("/add", function(req, res, next) {
  const eventDate = req.body.eventDate;
  const title = req.body.title;
  const time = req.body.time;
  const desc = req.body.desc;
  const share = req.body.share;

  Event.find({ eventDate: eventDate }, (err, data) => {
    if (err) console.log(err);
    /* Eğer aynı tarihli bir kayıt varsa eventData'ya yeni değerleri ekliyor.*/
    if (data.length > 0) {
      const dataID = data[0]._id;
      Event.findByIdAndUpdate(
        dataID,
        {
          $push: {
            eventData: {
              title: title,
              time: time,
              desc: desc,
              share: share
            }
          }
        },
        { safe: true, upsert: false },
        function(err, model) {
          console.log(err);
        }
      );
      //res.json(data);
      res.redirect("/etkinlik");
    } else {
      /* Eğer kayıt yoksa yeni kayıt oluşturuyor.*/
      const event = new Event({
        eventDate: eventDate,
        eventData: [
          {
            title: title,
            time: time,
            desc: desc,
            share: share
          }
        ]
      });
      event.save((err, data) => {
        if (err) console.log(err);
        //res.json(data);
        res.redirect("/etkinlik");
      });
    }
  });
});

router.get("/list", (req, res) => {
  Event.find({}, (err, data) => {
    res.json(data);
  });
});

router.get("/delete/:a/:b", (req, res) => {
  if (req.session.spslogin) {
    const mainID = req.params.a;
    const dataID = req.params.b;
    Event.update(
      { _id: mainID },
      { $pull: { eventData: { _id: dataID } } },
      function(err, obj) {
        //if (err) console.log(err);
        req.flash("info", "Etkinlik Silindi.");
        res.redirect("/etkinlik");
      }
    );
  } else {
    res.redirect("/");
  }
});

module.exports = router;
