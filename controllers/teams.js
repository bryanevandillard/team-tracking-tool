const { Team } = require("../models");

module.exports = {
  // 	create new team
  createTeam: async (req, res) => {
    try {
      if (!req.session.userId) {
        return res
          .status(401)
          .json({ message: "Unauthorized. Login required." });
      }
      const team = await Team.create({
        title: req.body.title,
        userId: req.session.userId,
      });
      res.json({ message: "Created team", team });
    } catch (error) {
      console.error(error);
      res
        .status(400)
        .json({ message: "An error occurred trying to create a team." });
    }
  },

  // delete team (including notes and members)
  deleteTeam: (req, res) => {
    res.json({ message: `TODO: delete team id = ${req.params.id}` });
  },
};
