const { Team, Member, Note } = require("../models");
const { invalidTeamError } = require("./errors");

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
  renderTeams: async (req, res) => {
    try {
      const teams = await Team.findAll({
        where: { userId: req.session.userId },
      });
      res.render("teams", {
        teams: teams.map((team) => {
          team = team.toJSON();
          team.createdAt = team.createdAt.getTime();
          return team;
        }),
      });
    } catch (error) {
      console.error(error);
      res.status(500).end();
    }
  },

  // 	display details for a specific team (can only view own teams)
  renderTeamDetails: async (req, res) => {
    try {
      const team = await Team.findOne({
        where: {
          userId: req.session.userId,
          id: req.params.id,
        },
        include: [{ model: Member, attributes: ["name"] }, Note],
        order: [[Note, "createdAt", "DESC"]],
      });
      if (!team) {
        return invalidTeamError(res);
      }
      res.render("team-details", {
        ...team.toJSON(),
        members: team.members.map((m) => m.name).join(", "),
        notes: team.notes.map((n) => ({
          ...n.toJSON(),
          createdAt: n.createdAt.getTime(),
        })),
      });
    } catch (error) {
      console.error(error);
      res.status(500).end();
    }
  },

  // 	add note to specific team (can only view view for own teams)
  renderAddNote: (req, res) => {
    res.render("add-note");
  },

  // view/add/delete members for a specific team (can only view view for own teams)
  renderMembers: async (req, res) => {
    try {
      const team = await Team.findOne({
        where: { userId: req.session.userId, id: req.params.id },
        include: { model: Member },
      });

      if (!team) {
        return res.redirect(`/teams/${req.params.id}`);
      }

      res.render("members", {
        heading: `${team.title} Members`,
        team: team.get({ plain: true }),
      });
    } catch (error) {
      console.error(error);
      res.status(500).send();
    }
  },

  renderAddTeam: (req, res) => {
    res.render("add-team");
  },
};
