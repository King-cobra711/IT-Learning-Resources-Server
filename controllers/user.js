const User = require("../models/user");
const Link = require("../models/link");

// req.profile is available because authMiddleware was called first in routes and thus req.profile was generated by attaching the result of a db query.

// hashed passwords and salt should not be sent to the frontend and thus have been changed to undefined

exports.read = (req, res) => {
  User.findOne({ _id: req.user._id }).exec((err, user) => {
    if (err) {
      res.json({
        error: "User not found",
      });
    }
    user.hashed_password = undefined;
    user.salt = undefined;
    res.json({
      user,
    });
  });
};