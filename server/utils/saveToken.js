const jwt = require("jsonwebtoken");
const saveToken = (_id, res) => {
  const token = jwt.sign({ _id }, process.env.JWT, { expiresIn: "5d" });
  res.cookie("jwt_token", token, {
    httpOnly: true,
    maxAge: 5 * 24 * 60 * 60 * 1000,
    sameSite: "None",
    secure: true,
  });
};

module.exports = { saveToken };
