const mongoose = require("mongoose");

mongoose.set("strictQuery", true);

mongoose.connect(process.env.DB_URI);

const userSchema = {
  name: String,
  workouts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Workout" }],
};

const User = mongoose.model("User", userSchema);

module.exports = User;
