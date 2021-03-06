# special-fiesta
Simple Express server which stores responses of HTTP requests to a MongoDB.

## Prerequisites
* Node >= 6.10.2
* MongoDB >= 3.2.4

## Get started
### Configure the application
Create a `config.json` file in the project root folder which contains the following info:
```
{
 // Where to GET the data - REQUIRED
 "targetURI": "https://www.example.com/api/v2/data",
 // Where to connect to a running MongoDB instance - REQUIRED
 "mongoURI": "mongodb://localhost:27017/",
 // Database name - OPTIONAL, defaults to "database"
 "mongoDBName": "fruits",
 // How often should the data be requested (in seconds) - OPTIONAL, defaults to 60 seconds
 "interval": "180",
 // Custom response data key - OPTIONAL, by default the whole data object is stored
 "dataKey": "latest",
 // Custom file name for the export action - OPTIONAL, defaults to "data.json"
 "exportFileName": "fruits"
}
``` 

### Start recording the data
Run `npm start` to start the application. You have to manually end the process if you want to
stop recording.

### Export the data as JSON
Run `npm run export` to create a JSON file with the records from the DB.
