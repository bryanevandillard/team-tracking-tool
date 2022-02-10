const router = require("express").Router();
const homeRouter = require("./homeRouter");
const apiRouter = require("./api");

router.use(homeRouter);
router.use("/api", apiRouter);

module.exports = router;
