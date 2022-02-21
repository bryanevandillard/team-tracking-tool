const { Member, Team } = require("../models");
const { invalidTeamError, serverError } = require("./errors");

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
      serverError(res);
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
      serverError(res);
    }
  },
};
