const express = require("express");

// Import controllers
const { createMember, deleteMember } = require("./members");
const { withAuth } = require("./middleware");
const { createNote, deleteNote } = require("./notes");
const { createTeam, deleteTeam } = require("./teams");
const { createUser, login, logout } = require("./users");
const {
  renderHome,
  renderSignup,
  renderLogin,
  renderTeams,
  renderTeamDetails,
  renderAddNote,
  renderMembers,
  renderAddTeam,
  renderWithLoginState,
} = require("./views");
const router = express.Router();

// Member API routes
router.use("/api/members", withAuth);
router.post("/api/members", createMember);
router.delete("/api/members/:id", deleteMember);

// Notes API routes
router.post("/api/notes", createNote);
router.delete("/api/notes/:id", deleteNote);

// Teams API routes
router.post("/api/teams", createTeam);
router.delete("/api/teams/:id", deleteTeam);

// User API routes
router.post("/api/users", createUser);
router.post("/api/users/login", login);
router.post("/api/users/logout", logout);

// Add view routes
const viewRouter = express.Router();
viewRouter.use(renderWithLoginState);
viewRouter
  .get("/", renderHome)
  .get("/signup", renderSignup)
  .get("/login", renderLogin)
  .get("/teams", renderTeams)
  .get("/teams/add", renderAddTeam)
  .get("/teams/:id", renderTeamDetails)
  .get("/teams/:id/add-note", renderAddNote)
  .get("/teams/:id/members", withAuth, renderMembers);
router.use(viewRouter);

module.exports = router;
