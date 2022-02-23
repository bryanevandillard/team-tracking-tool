const { Note, Team } = require("../models");
const { invalidTeamError, serverError, forbiddenError } = require("./errors");

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
      res.json({ message: "Created note", note });
    } catch (error) {
      console.error(error);
      serverError(res);
    }
  },
  deleteNote: async (req, res) => {
    try {
      const note = await Note.findByPk(req.params.id, { include: Team });
      if (!note) {
        return res.status(404).json({ message: "Note not found" });
      }
      if (note.team.userId !== req.session.userId) {
        return forbiddenError(res);
      }
      await note.destroy();
      res.json({ message: "Deleted note" });
    } catch (error) {
      console.error(error);
      serverError(res);
    }
  },
};
