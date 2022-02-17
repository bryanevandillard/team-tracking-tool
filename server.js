const express = require("express");
const session = require("express-session");
// initialize sequelize with session store
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const sequelize = require("./config/sequelize");
const { engine } = require("express-handlebars");
const routes = require("./controllers");

const PORT = process.env.PORT || 3001;
const app = express();

// configure session middleware
app.use(
  session({
    secret: "keyboard cat",
    cookie: {
      // expires after 24 hours
      maxAge: 24 * 60 * 60 * 1000,
      // only use cookie for login session (no client side data)
      httpOnly: true,
      // TODO: use process.env.NODE_ENV to conditionally set cookie to secure mode
    },
    store: new SequelizeStore({
      db: sequelize,
    }),
    resave: false, // we support the touch method so per the express-session docs this should be set to false
    proxy: true, // node server sits behind a Heroku proxy when deployed
    secure: false,
    saveUninitialized: false,
  })
);

// Use handlebars for rendering html
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

(async function startServer() {
  try {
    await sequelize.sync();
    app.listen(PORT, () => console.log(`🌎 App listening on port ${PORT}`));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
