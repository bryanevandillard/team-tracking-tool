const homeRouter = require("express").Router();

// /	explains what the app is and has a "Call to action" button to go signup
homeRouter.get("/", (req, res) => {
  res.render("home");
});

// /signup	user registration form
homeRouter.get("/signup", (req, res) => {
  res.render("signup");
});


// /login	user login form
homeRouter.get("/login", (req, res) => {
  res.render("login");
});

// /teams	display logged in users teams (kind like a dashboard)
homeRouter.get("/teams", (req, res) => {
  res.render("teams");
});

// /teams/:id	display details for a specific team (can only view own teams)
homeRouter.get("/teams/:id", (req, res) => {
  res.render("team-details");
});

// /teams/:id/add-note	add note to specific team (can only view view for own teams)
homeRouter.get("/teams/:id/add-note", (req, res) => {
  res.render("add-note");
});

// /teams/:id/members	view/add/delete members for a specific team (can only view view for own teams)
homeRouter.get("/teams/:id/members", (req, res) => {
  res.render("members");
});

module.exports = homeRouter;
