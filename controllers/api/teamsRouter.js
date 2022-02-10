const teamsRouter = require("express").Router();
// POST	/api/teams	create new team
teamsRouter.post("/", (req, res) => {
  res.json({ message: "TODO: create team" });
});

// DELETE	/api/teams/:id	delete team (including notes and members)
teamsRouter.delete("/:id", (req, res) => {
  res.json({ message: `TODO: delete team id = ${req.params.id}` });
});

module.exports = teamsRouter;
