require('dotenv').config();
const mongoose = require('mongoose');

const dbString = process.env.connectionString;
mongoose.connect(dbString);

const connection = mongoose.connection;
connection.on("connected", () => {
    console.log("Database Connected");
});

connection.on("error", () => {
    console.log("Unable to connect Database");
});