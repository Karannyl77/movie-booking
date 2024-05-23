const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const movieRouter = require("./routes/movie");
require("dotenv").config();
const app = express();


// connection with local mongodb server
// local mongodb url : mongodb://127.0.0.1:27017
async function main() {
  await mongoose.connect('mongodb+srv://karannayal:imkaran@test-pro-db.st45ekg.mongodb.net/');
  console.log("database connected");
}
main().catch((err) => console.log(err));

// middlewares
app.use(express.json());
// enabeling cors for cross origin support.
app.use(cors());
// movie router
app.use("/api/booking", movieRouter);

// Handeling Routes of Cliant
app.use(express.static(path.join(__dirname, 'build')));
app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, 'build', "index.html"));
});

// listening the server on port 8080.
app.listen(8080, () => {
  console.log(`Server is running on the port 8080`);
});
