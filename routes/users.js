const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/backend2auth")
  .then(() => {
    console.log("Connected to backend");
  })
  .catch((error) => {
    console.log("Not connected");
  });

// const userSchema = mongoose.Schema({
//   username: String,
//   nickname: String,
//   description: String,
//   categories: {
//     type: Array,
//     default: [],
//   },
//   dateCreated: {
//     type: Date,
//     default: Date.now(),
//   },
// });

const userSchema = mongoose.Schema({
  username: String,
  password: String,
  secret: String,
});

userSchema.plugin(plm);

module.exports = mongoose.model("User", userSchema);
