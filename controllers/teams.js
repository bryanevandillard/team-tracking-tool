const { Team } = require("../models");
const { invalidTeamError, serverError } = require("./errors");

module.exports = {
  // 	create new team
  createTeam: async (req, res) => {
    try {
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
  deleteTeam: async (req, res) => {
    try {
      const deleteCount = await Team.destroy({
        where: {
          userId: req.session.userId,
          id: req.params.id,
        },
      });

      if (deleteCount === 0) {
        return invalidTeamError(res);
      }
      return res.json({ message: `Deleted ${req.params.id}` });
    } catch (error) {
      console.error(error);
      serverError(res);
    }
  },
};
