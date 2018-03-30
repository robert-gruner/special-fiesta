const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const DBEntrySchema = new Schema({
  time: {updated: {type: Date, default: Date.now}},
  value: Schema.Types.Mixed
});
const DBEntry = Mongoose.model("DBEntry", DBEntrySchema);

module.exports = DBEntry;
