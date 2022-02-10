const usersRouter = require("express").Router();

// POST	/api/users	create a new user
usersRouter.post("/", (req, res) => {
  res.json({ message: "TODO: create new user" });
});

// POST	/api/users/login	log in given email and password
usersRouter.post("/", (req, res) => {
  res.json({ message: "TODO: create login session for user" });
});

// POST	/api/users/logout	end the session
usersRouter.post("/", (req, res) => {
  res.json({ message: "TODO: destroy user session" });
});

module.exports = usersRouter;
