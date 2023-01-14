const jwt = require("jsonwebtoken");
require("dotenv").config();

const authorization = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.key);
      if (decoded) {
        console.log(decoded);
        req.body.userID = decoded.userID;
        next();
      } else {
        console.log("");
        res.send("please login");
      }
    } catch (error) {
      res.status(401).json({ msg: "Invalid token" });
    }
  } else {
    res.send("Please login");
  }
};

module.exports = {
  authorization,
};
