const Axios = require("axios");
const Logger = require("winston");
const process = require("process");
// const mongoose = require("mongoose");

let config;

try {
  config = require("./config.json");
  checkRequiredEntries();
} catch (e) {
  exitWithError(e ? e : "Provide a valid config.json file." + e);
}

const interval = config.interval ? config.interval * 1000 : 2000; // Interval in milliseconds

setInterval(() => {
  doGet();
}, interval);

function exitWithError(errorMessage) {
  Logger.error(errorMessage);
  process.exit();
}

function checkRequiredEntries() {
  if (!config.targetURI) {
    throw("Config is missing a target URI.");
  } else if (!config.mongoURI) {
    throw("Config is missing a Mongo URI.");
  }
}

function storeData(obj) {
  Logger.info(JSON.stringify(obj));
}

function doGet() {
  Axios.get(config.targetURI)
    .then((response) => {
      const data = config.dataKey ? response.data[config.dataKey] : response.data;
      storeData(data);
    })
    .catch((error) => {
      exitWithError(error);
    });
}
