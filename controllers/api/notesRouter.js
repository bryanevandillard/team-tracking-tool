const notesRouter = require("express").Router();

// POST	/api/notes	create note and add to team
notesRouter.post("/", (req, res) => {
  res.json({ message: "TODO: create note" });
});

// DELETE	/api/notes/:id	delete note
notesRouter.delete("/:id", (req, res) => {
  res.json({ message: `TODO: delete note ${req.params.id}` });
});

module.exports = notesRouter;
