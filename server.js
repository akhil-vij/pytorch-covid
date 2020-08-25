const bodyParser = require("body-parser");
const express = require("express");
const app = express();

app.use(express.static(__dirname + "/dist"));

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.route("/search").get(function (req, res) {
  console.log(req);
  res.send({ express: "Hello From Express" });
});

var port = process.env.PORT || process.env.VCAP_APP_PORT || 5000;
app.listen(port);

const forceSSL = function () {
  return function (req, res, next) {
    if (req.headers["x-forwarded-proto"] !== "https") {
      return res.redirect(["http://", req.get("Host"), req.url].join(""));
    }
    next();
  };
};
app.use(forceSSL());
const path = require("path");
// ...
// For all GET requests, send back index.html
// so that PathLocationStrategy can be used
//TODO: check this out
app.get("/*", function (req, res) {
  console.log(req);
  res.sendFile(path.join(__dirname + "/dist/index.html"));
});
