const express = require("express");
const routes = require("./routes");
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("static"));

routes(app);

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
