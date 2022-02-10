const express = require("express");
const sequelize = require("./config/sequelize");
const { engine } = require("express-handlebars");
const routes = require("./controllers");

const PORT = process.env.PORT || 3001;
const app = express();

// Use handlebars for rendering html
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.use(routes);

async function start() {
  try {
    await sequelize.sync();
    app.listen(PORT, () => console.log(`🌎 App listening on port ${PORT}`));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}
start();
