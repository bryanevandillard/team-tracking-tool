const usersRouter = require("express").Router();
const { User } = require("../../models");
// POST	/api/users	create a new user
usersRouter.post("/", async (req, res) => {
  try {
    // Create new user
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    // Initialize login session and store userId in the session
    req.session.userId = user.id;
    req.session.save(() => {
      res.json({ message: "Created user", user });
    });
  } catch (error) {
    console.error(error);
    // Send 400 error if username or email is not unique
    if (error.name === "SequelizeUniqueConstraintError") {
      res.status(400).json({
        message: `${error.errors[0].path} '${error.errors[0].value}' already exists.`,
      });
      return;
    }
    // All other errors use 500 status
    res.status(500).json({ message: "Server error" });
  }
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
