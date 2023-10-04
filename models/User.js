const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 4, // Validate minimum length
  },
});

// Use a pre-save hook to hash the password before saving
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});

// Define a method to check the password
userSchema.methods.checkPassword = function (loginPw) {
  return bcrypt.compareSync(loginPw, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;