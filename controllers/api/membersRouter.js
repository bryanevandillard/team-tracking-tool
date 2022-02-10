const membersRouter = require("express").Router();

// POST	/api/members	create member
membersRouter.post("/", (req, res) => {
  res.json({ message: "TODO: create note" });
});

// DELETE	/api/members/:id	delete member
membersRouter.post("/:id", (req, res) => {
  res.json({ message: `TODO: delete member id = ${req.params.id}` });
});

module.exports = membersRouter;
