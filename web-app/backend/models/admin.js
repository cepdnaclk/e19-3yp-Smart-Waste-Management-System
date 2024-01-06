const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const adminSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { collection: "admin-data" }
);

adminSchema.statics.signup = async function (name, email, password) {
  // validation
  if (!email || !password || !name) {
    throw Error("All field should be filled");
  }

  if (!validator.isLength(password, { min: 8 })) {
    throw new Error("Password must be at least 8 characters");
  }
  if (!validator.isEmail(email)) {
    throw new Error("Invalid email format");
  }
  if (!validator.isStrongPassword(password)) {
    throw new Error(
      `Password should contain the following: 1. A lowercase letter, 2. An uppercase letter,3. A number,4. A special character`
    );
  }

  // Check if user already exists in the database
  const exist = await this.findOne({ email });
  if (exist) {
    throw new Error("Email already used.");
  }
  // Hashing the password with a salt
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return this.create({ name, email, password: hashedPassword });
};

adminSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All field should be filled");
  }

  // Check if user already exists in the database
  const user = await this.findOne({ email });
  if (!user) {
    throw new Error("Incorrect Email or Password");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new Error("Incorrect Email or Password");
  }
  return user;
};

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;
