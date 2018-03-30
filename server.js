const Axios = require("axios");
const Logger = require("winston");
const Process = require("process");
const Mongoose = require("mongoose");
const DBEntry = require("./db-entry");

let config, db;

// Check config for validity
try {
  config = require("./config.json");
  checkRequiredEntries();
} catch (err) {
  exitWithError(err ? err : "Provide a valid config.json file." + err);
}

// Set up Mongo connection
connectMongo();

// Set up interval
const interval = config.interval ? config.interval * 1000 : 60000; // Interval in milliseconds
setInterval(() => {
  doGet();
}, interval);

function exitWithError(err) {
  Logger.error(err);
  Process.exit();
}

function checkRequiredEntries() {
  if (!config.targetURI) {
    throw("Config is missing a target URI.");
  } else if (!config.mongoURI) {
    throw("Config is missing a Mongo URI.");
  }
}

function storeData(data) {
  const newEntry = DBEntry({
    time: Date.now(),
    value: data
  });
  newEntry.save();
}

function doGet() {
  Axios.get(config.targetURI)
    .then((response) => {
      const data = config.dataKey ? response.data[config.dataKey] : response.data;
      storeData(data);
    }).catch((err) => {
    exitWithError(err);
  });
}

function connectMongo() {
  const dbName = config.mongoDBName ? config.mongoDBName : "database";
  const uri = config.mongoURI + dbName;

  Mongoose.connect(uri, (err) => {
    if (err) {
      exitWithError(err);
    }
  });

  db = Mongoose.connection;

  db.on("err", (err) => {
    exitWithError(err);
  });
}
