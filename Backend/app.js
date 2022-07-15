const express = require("express");
const app = express();
require("dotenv/config");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const authJwt = require("./helpers/jwt");
const errorHandler = require("./helpers/error-handler");

const PORT = process.env.PORT || 3000;

app.use(cors());
// app.options("*", cors());

app.use(express.json());
app.use(morgan("tiny"));
app.use(authJwt());
app.use(errorHandler);
app.use("/public/uploads", express.static(__dirname + "/public/uploads"));

const api = process.env.API_URL;
//BmcG2Pfd0uUlvPHv
mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: process.env.DB_NAME,
  })
  .then(() => {
    console.log("Database connection is ready..");
  })
  .catch((err) => {
    console.log(err);
  });

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With,Content-Type,Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PATCH,DELETE,OPTIONS"
  );
  next();
});

//Routes
const booksRoutes = require("./routes/booklist");
const addbookRoutes = require("./routes/addbook");
const updatebookRoutes = require("./routes/updatebook");
const usersRoutes = require("./routes/users");

app.use(`${api}/booklist`, booksRoutes);
app.use(`${api}/addbook`, addbookRoutes);
app.use(`${api}/updatebook`, updatebookRoutes);
app.use(`${api}/users`, usersRoutes);

app.listen(PORT, () => {
  console.log("Server is listening");
});
