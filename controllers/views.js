module.exports = {
  renderWithLoginState: (req, res, next) => {
    const prevRenderFn = res.render.bind(res);
    res.render = (view, ...args) => {
      const isLoggedIn = Boolean(req.session.userId);
      if (args.length === 0 || typeof args[0] === "function") {
        return prevRenderFn(view, { isLoggedIn }, ...args);
      }
      return prevRenderFn(view, { isLoggedIn, ...args[0] }, args[1]);
    };
    next();
  },
  // explains what the app is and has a "Call to action" button to go signup
  renderHome: (req, res) => {
    console.log(res.render);
    console.log("rendering home");
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

  renderAddTeam: (req, res) => {
    res.render("add-team");
  },
};
