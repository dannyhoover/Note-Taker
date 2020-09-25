const express = require("express");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 8080;

const app = express();

// middleware
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(express.static("public"));

// routes
app.use("/api", require("./routes/api-routes.js"));
app.use("/", require("./routes/html-routes.js"));

app.listen(PORT, function() {
  console.log(`App listening: 🌎 => ${PORT}`);
});