const router = require("express").Router();
const homeRouter = require("./homeRouter");

router.use(homeRouter);

module.exports = router;
