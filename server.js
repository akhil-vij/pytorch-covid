const { createServer } = require("http");
const express = require("express");
const compression = require("compression");
const morgan = require("morgan");
const app = express();

const dev = app.get("env") !== "production";
const path = require("path");

app.route("/search").get(function (req, res) {
  console.log(req);
  res.send({ express: "Hello From Express" });
});

if (!dev) {
  app.disable("x-powered-by");
  app.use(compression());
  app.use(morgan("common"));
  app.use(express.static(path.resolve(__dirname, "build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "build", "index.html"));
  });
}

if (dev) {
  app.use(morgan("dev"));
}
const port = process.env.PORT || process.env.VCAP_APP_PORT || 5000;
const server = createServer(app);

server.listen(port, (err) => {
  if (err) {
    throw err;
  }
  console.log("Server started");
});
