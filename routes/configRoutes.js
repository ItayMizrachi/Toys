const path = require("path");

const indexR = require("./index");
const usersR = require("./users");
const toysR = require("./toys");

exports.routesInit = (app) => {
  app.use("/", indexR);
  app.use("/users", usersR);
  app.use("/toys", toysR);

  app.get('*', function (req, res) {
    res.status(404).sendFile(path.join(__dirname, "..", "public", "page404.html"));
  });
}