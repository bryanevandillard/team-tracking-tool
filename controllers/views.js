module.exports = {
  // explains what the app is and has a "Call to action" button to go signup
  renderHome: (req, res) => {
    res.render("home");
  },

  // signup	user registration form
  renderSignup: (req, res) => {
    res.render("signup");
  },
  // login	user login form
  renderLogin: (req, res) => {
    res.render("login");
  },

  // teams	display logged in users teams (kind like a dashboard)
  renderTeams: (req, res) => {
    res.render("teams");
  },

  // 	display details for a specific team (can only view own teams)
  renderTeamDetails: (req, res) => {
    res.render("team-details");
  },

  // 	add note to specific team (can only view view for own teams)
  renderAddNote: (req, res) => {
    res.render("add-note");
  },

  // view/add/delete members for a specific team (can only view view for own teams)
  renderMembers: (req, res) => {
    res.render("members");
  },
};
