const path = require("path");

const indexR = require("./index");
const usersR = require("./users");
const toysR = require("./toys");
const openaiR = require("./openai");

exports.routesInit = (app) => {
  app.use("/", indexR);
  app.use("/users", usersR);
  app.use("/toys", toysR);
  app.use("/openai", openaiR);

  app.get('*', function (req, res) {
    res.status(404).sendFile(path.join(__dirname, "..", "public", "page404.html"));
  });
}