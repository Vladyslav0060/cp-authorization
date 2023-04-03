const express = require("express");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
var cors = require("cors");
const authRouter = require("./src/routers/authRouter");
const coinRouter = require("./src/routers/coinRouter");
const mailRouter = require("./src/routers/mailRouter");
const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());

const fixSettings = () => {
  mongoose.set("useNewUrlParser", true);
  mongoose.set("useFindAndModify", false);
  mongoose.set("useCreateIndex", true);
};

app.use(express.json());
app.use("/", (req, res) => res.send("Server works"));
app.use("/auth", authRouter);
app.use("/coin", coinRouter);
app.use("/mailer", mailRouter);
const start = async () => {
  try {
    fixSettings();
    app.listen(PORT, () => console.log(`server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
