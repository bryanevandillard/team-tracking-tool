const { User } = require("../models");
const { serverError } = require("./errors");

module.exports = {
  // create a new user
  createUser: async (req, res) => {
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
      serverError(res);
    }
  },

  // log in given email and password
  login: async (req, res) => {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      res.status(401).json({ message: "Invalid email or password given" });
      return;
    }
    const isAuthentic = await user.checkPassword(req.body.password);
    if (!isAuthentic) {
      res.status(401).json({ message: "Invalid email or password given" });
      return;
    }
    // init the login session
    req.session.userId = user.id;
    req.session.save(() => {
      // don't provide password hash to clients
      const { id, username, email } = user;
      res.json({ message: "Logged in", user: { id, username, email } });
    });
  },

  //end the session
  logout: (req, res) => {
    req.session.destroy(() => {
      res.json({ message: "Good bye." });
    });
  },
};
