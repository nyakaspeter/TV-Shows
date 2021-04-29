const express = require("express");
const seed = require("./config/seed");
const mongoose = require("./config/db");
const routes = require("./config/routes");
const app = express();

const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("static"));

routes(app);
seed();

mongoose.connection.on("open", () =>
  app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`))
);
