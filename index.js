const express = require("express");
const app = express();
const dbConnection = require("./config/db");
const cors = require("cors");

let port = process.env.PORT || 9090;

dbConnection();
app.use(express.json());
app.use(cors());

const userRoutes = require("./routes/userRoutes");
const worklogRoutes = require("./routes/worklogs");

app.use("/api/v1", userRoutes);
app.use("/api/v1", worklogRoutes);

app.listen(port, () => {
  console.log(`Server has started on Port ${port}`);
});
