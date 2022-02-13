const homeRouter = require("express").Router();

// /	explains what the app is and has a "Call to action" button to go signup
homeRouter.get("/", (req, res) => {
  res.render("home");
});

// /signup	user registration form
homeRouter.get("/signup", (req, res) => {
  res.render("signup");
})
// /login	user login form
// /teams	display logged in users teams (kind like a dashboard)
// /teams/:id	display details for a specific team (can only view own teams)
// /teams/:id/add-note	add note to specific team (can only view view for own teams)
// /teams/:id/members	view/add/delete members for a specific team (can only view view for own teams)

module.exports = homeRouter;
