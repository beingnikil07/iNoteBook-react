// This file only used to establish a connection.

const mongoose = require("mongoose"); // we are using common js to include mongoose

const mongoURI = "mongodb://localhost:27017"; // mongoose connection string essential to connect with database

const connectToMongo = () => {
  mongoose.connect(mongoURI, () => {
    //connect is the method of mongoose  which takes
    //mongoURI(connection string) and returns a promise.It returns a promise so we can
    //use either callbacks or async/awai .Here we are using a callback function

    console.log("connected to mongo successfully");
  });
};

module.exports = connectToMongo;
// module.expots is used to export the function
