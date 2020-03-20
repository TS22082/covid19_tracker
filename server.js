require('dotenv').config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

//sets app up for requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//routes
// const apiRoutes = require("./routes/apiRoutes");
// app.use("/api", apiRoutes);
const routes = require('./routes');
app.use(routes);

// prepares for heroku deployment after build is created
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// opens port
app.listen(PORT, () => {
  console.log(`listening at http://localhost:${PORT}`);
});
