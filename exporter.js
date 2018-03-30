const Mongoose = require("mongoose");
const Fs = require("fs");
const Process = require("process");

const DBEntry = require("./db-entry");
const config = require("./config.json");

let db;
connectMongo();
exportDataAsJson();

function connectMongo() {
  const dbName = config.mongoDBName ? config.mongoDBName : "database";
  const uri = config.mongoURI + dbName;
  Mongoose.connect(uri);
  db = Mongoose.connection;
}

function exportDataAsJson() {
  DBEntry.find().lean().exec((err, entries) => {
    const json = JSON.stringify(entries);
    console.log("json", json);

    const fileName = config.exportFileName ? config.exportFileName : "data";
    Fs.writeFile(fileName + ".json", json, "utf8", () => {
      Process.exit();
    });
  });
}
