const { Note, Team } = require("../models");
const { invalidTeamError, serverError } = require("./errors");

module.exports = {
  createNote: async (req, res) => {
    try {
      const note = new Note({
        teamId: req.body.teamId,
        body: req.body.body,
        createdAt: req.body.createdAt,
      });
      const team = await Team.findOne({
        where: { userId: req.session.userId, id: req.body.teamId },
      });
      if (!team) {
        return invalidTeamError(res);
      }
      await note.save();
      res.json({ message: "Created noter", note });
    } catch (error) {
      console.error(error);
      serverError(res);
    }
  },
  deleteNote: (req, res) => {
    res.json({ message: `TODO: delete note ${req.params.id}` });
  },
};
