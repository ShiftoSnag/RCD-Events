const router = require("express").Router();
const Event = require("../../models/Event");
const Comment = require("../../models/Comment");
const authenticateToken = require("../../middleware/auth");

// GET all events of all users
router.get("/all", async (req, res) => {
  try {
    const eventData = await Event.find()
      .populate({
        path: "user",
        select: "name",
      })
      .sort({ date_created: -1 });
    const events = eventData.map((event) => event.toObject());
    res.status(200).json({ events });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get all event of one user
router.get("/allofuser", authenticateToken, async (req, res) => {
  try {
    const eventData = await Event.find({ user: req._id })
      .populate({
        path: "user",
        select: "name",
      })
      .sort({ date_created: -1 });
    const events = eventData.map((event) => event.toObject());
    res.status(200).json({ events });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET one event
router.get("/:id", async (req, res) => {
  try {
    const eventData = await Event.findById(req.params.id).populate({
      path: "user",
      select: "name",
    });

    if (!eventData) {
      res.status(404).json({ message: "No event found with this id!" });
      return;
    }

    res.status(200).json(eventData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE new event
router.post("/", authenticateToken, async (req, res) => {
  try {
    const eventData = await Event.create({
      ...req.body,
      user: req._id,
    });
    res.status(200).json(eventData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// UPDATE one event
router.put("/:id", authenticateToken, async (req, res) => {
  try {
    const eventData = await Event.findOneAndUpdate(
      { _id: req.params.id, user: req._id },
      {
        title: req.body.title,
        content: req.body.content,
        date: req.body.date,
      }
    );

    if (!eventData) {
      res.status(404).json({ message: "No event found with this id!" });
      return;
    }

    res.status(200).json("event updated");
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE one event
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const eventData = await Event.findOne({
      _id: req.params.id,
      user: req._id,
    });

    if (!eventData) {
      res.status(404).json({ message: "No event found with this id!" });
      return;
    }

    const comments = await Comment.find({ event: req.params.id });

    // Loop over the comments and delete each one
    for (const comment of comments) {
      await comment.deleteOne();
    }

    eventData.deleteOne();

    res.status(200).json("event deleted");
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
