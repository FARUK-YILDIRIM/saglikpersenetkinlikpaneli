const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  eventDate: { type: String, required: true, unique: true },
  eventData: [{ title: String, time: String, desc: String, share: String }]
});

module.exports = mongoose.model("event", EventSchema);
