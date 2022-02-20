const { Member, Team } = require("../models");

const invalidTeamError = (res) =>
  res.status(400).json({
    message: "Team doesn't exist or user is not the team owner.",
  });

module.exports = {
  // create member
  createMember: async (req, res) => {
    try {
      const member = new Member({
        name: req.body.name,
        teamId: req.body.teamId,
      });
      const team = await Team.findOne({
        where: { userId: req.session.userId, id: req.body.teamId },
      });
      if (!team) {
        return invalidTeamError(res);
      }
      await member.save();
      res.json({ message: "Created member", member });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },

  // delete member
  deleteMember: async (req, res) => {
    try {
      const member = await Member.findByPk(req.params.id, { include: Team });
      if (member.team.userId !== req.session.userId) {
        return invalidTeamError(res);
      }
      await member.destroy();
      res.json({ message: `Deleted ${member.id}` });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },
};
