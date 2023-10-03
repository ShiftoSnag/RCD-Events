const router = require("express").Router();

const userRoutes = require("./userRoutes");
const eventRoutes = require("./eventRoutes");
const commentRoutes = require("./commentRoutes");

router.use("/users", userRoutes);
router.use("/events", eventRoutes);
router.use("/comments", commentRoutes);

module.exports = router;
