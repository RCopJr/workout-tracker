const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protect = async (req, res, next) => {
  let token = 0;

  console.log("in protect");

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = await jwt.verify(token, process.env.JWT_SECRET);

      res.user = await User.findById(decoded.id).select("-password");
      console.log(decoded);
      next();
    } catch (error) {
      res.json({
        message: "failed to authorizes",
      });
    }
  }

  if (!token) {
    console.log("no token");
    res.json({
      message: "no token",
    });
  }
};

module.exports = {
  protect,
};
