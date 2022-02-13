const express = require("express");
const sequelize = require("./config/sequelize");
const { engine } = require("express-handlebars");
const router = require("./controllers");

const PORT = process.env.PORT || 3001;
const app = express();

// setup static middleware to serve js, css, images, and other files
app.use(express.static("public"));
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.use(router);

(async () => {
  try {
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`🚀 Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
