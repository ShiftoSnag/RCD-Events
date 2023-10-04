const router = require("express").Router();
const authenticateToken = require("../../middleware/auth");
const Comment = require("../../models/Comment");

// get all comments from the one post
router.get("/:eventId", async (req, res) => {
  try {
    const commentData = await Comment.find({
      event: req.params.eventId,
    })
      .populate("user")
      .populate("event");
    res.status(200).json({ commentData });
  } catch (err) {
    res.status(500).json(err);
  }
});

// edit comment
router.put("/:id", authenticateToken, async (req, res) => {
  try {
    const commentData = await Comment.findByIdAndUpdate(req.params.id, {
      ...req.body,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete comment
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const commentData = await Comment.findByIdAndRemove(req.params.id);
  } catch (err) {
    res.status(500).json(err);
  }
});

// new comment
router.post("/:eventId", authenticateToken, async (req, res) => {
  try {
    let comment = await Comment.findOne({
      user: req._id,
      event: req.params.eventId,
    });
    let updatedComment;
    if (comment) {
      updatedComment = await Comment.findOneAndUpdate(
        { user: req._id, event: req.params.eventId },
        {
          content: req.body.content,
        }
      );
    } else {
      updatedComment = await Comment.create({
        content: req.body.content,
        user: req._id,
        event: req.params.eventId,
      });
    }

    res.status(200).json({ updatedComment });
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
