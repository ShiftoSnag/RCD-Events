const router = require("express").Router();
const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const { saveToken } = require("../../utils/saveToken");
const authenticateToken = require("../../middleware/auth");

router.get("/loggedIn", (req, res) => {
  const token = req.cookies.jwt_token;

  if (!token) {
    return res.status(401).json({ loggedIn: false });
  }

  jwt.verify(token, process.env.JWT, (err, data) => {
    if (err) {
      return res.status(401).json({ loggedIn: false });
    }
    res.status(200).json({ loggedIn: true });
  });
});

// CREATE new user
router.post("/signup", async (req, res) => {
  try {
    const userData = await User.create(req.body);
    saveToken(userData._id, res);
    res.status(201).json({ message: `${userData.name} user created!` });
  } catch (err) {
    res.status(500).json(err);
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({ email: req.body.email });

    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect username or password, please try again" });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect username or password, please try again" });
      return;
    }

    saveToken(userData._id, res);
    res.status(201).json({ message: `you logged in!` });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: err.toString(),
      message: "An error occurred while logging in. Please try again.",
    });
  }
});

// Logout
router.get("/logout", (req, res) => {
  res.clearCookie("jwt_token");
  res.send("Logged out successfully");
});

// Get one user
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    res.json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// edit user
router.get("/:id", authenticateToken, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, {
      ...req.body,
    });
    res.json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Get all users
router.get("/", async (req, res) => {
  try {
    const user = await User.find();
    res.json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
