const apiRouter = require("express").Router();
const membersRouter = require("./membersRouter");
const notesRouter = require("./notesRouter");
const teamsRouter = require("./teamsRouter");
const usersRouter = require("./usersRouter");

apiRouter.use("/notes", membersRouter);
apiRouter.use("/notes", notesRouter);
apiRouter.use("/teams", teamsRouter);
apiRouter.use("/users", usersRouter);

module.exports = apiRouter;
