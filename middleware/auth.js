const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const token = req.cookies.jwt_token;

  if (!token) {
    return res.status(401).send("Access Denied");
  }

  jwt.verify(token, process.env.JWT, (err, data) => {
    if (err) {
      return res.status(403).send("Invalid Token");
    }
    req._id = data._id;
    next();
  });
}

module.exports = authenticateToken;
