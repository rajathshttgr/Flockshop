const express = require("express");
//const userRoutes = require("./routes/user.routes");
//const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(express.json());
//app.use("/api/users", userRoutes);

// Error handler
//app.use(errorHandler);
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

module.exports = app;
