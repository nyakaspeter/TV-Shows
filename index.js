const express = require("express");
const routes = require("./routes");
const app = express();
const port = 3000;

routes(app);

app.use(express.static("static"));

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
