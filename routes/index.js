var express = require("express");
var router = express.Router();
const userModel = require("./users");
const passport = require("passport");
const localStrategy = require("passport-local");

passport.use(new localStrategy(userModel.authenticate()));

//  GET home page. */
router.get("/", function (req, res) {
  res.render("index");
});

/* GET create page. */
// router.get("/create", async function (req, res) {
//   let userData = await userModel.create({
//     username: "Afjal",
//     nickname: "inshaaa",
//     description: "I am afjal khan",
//     categories: ["drawing", "js", "nodejs", "reactjs"],
//   });
//   res.send(userData);
// });

// Question 1
// router.get("/find", async function (req, res) {
//   let regex = new RegExp("^rohit$", "i");
//   let user = await userModel.find({ username: regex });
//   res.send(user);
// });

// Question 2
// router.get("/cateogary", async function (req, res) {
//   let user = await userModel.find({ categories: { $all: ["js"] } });
//   res.send(user);
// });

// Question 3
// router.get("/date", async function (req, res) {
//   let date1 = new Date("2023-11-09");
//   let date2 = new Date("2023-11-11");
//   let user = await userModel.find({
//     dateCreated: { $gte: date1, $lte: date2 },
//   });
//   res.send(user);
// });

// Queston 4
// router.get("/exists", async function (req, res) {
//   let user = await userModel.find({ categories: { $exists: true } });
//   res.send(user);
// });

// Question 5
// router.get("/length", async function (req, res) {
//   let user = await userModel.find({
//     $expr: {
//       $and: [
//         { $gte: [{ $strLenCP: "$nickname" }, 0] },
//         { $lte: [{ $strLenCP: "$nickname" }, 4] },
//       ],
//     },
//   });
//   res.send(user);
// });

// AUTHENTICATION AND AUTHORIZATION

router.get("/profile", isLoggedIn, function (req, res) {
  res.render("profile");
});

router.post("/register", function (req, res) {
  var userdata = new userModel({
    username: req.body.username,
    secret: req.body.secret,
  });

  userModel
    .register(userdata, req.body.password)
    .then(function (registereduser) {
      passport.authenticate("local")(req, res, function () {
        res.redirect("/profile");
      });
    });
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/",
  }),
  function (req, res) {}
);

router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}

module.exports = router;
