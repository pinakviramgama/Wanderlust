const express = require("express");
const passport = require("passport");
const { isLoggedin, saveRedirectedUrl } = require("../middleware");
const router = express.Router();
const User = require("../models/user");

// Login page (GET)
router.get("/login", (req, res) => {
  res.render("users/login.ejs"); // Render the login page
});

// Signup page (GET)
router.get("/signup", (req, res) => {
  res.render("users/form.ejs"); // Render the signup page
});

router.post("/signup", async (req, res, next) => {
  try {
    const { email, username, password } = req.body;

    // Check if email is already in use
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      req.flash("error", "Email is already in use!");
      return res.redirect("/signup");
    }

    // Register new user using passport-local-mongoose
    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);

    // Automatically log in the new user
    req.login(registeredUser, (err) => {
      if (err) {
        return next(err); // Handle error if login fails
      }
      req.flash("success", "Welcome to Wanderlust!");
      res.redirect("/testlisting"); // Redirect to the appropriate page after signup
    });
  } catch (err) {
    req.flash("error", err.message);
    res.redirect("/signup"); // If any error occurs, redirect back to signup page
  }
});

// Login logic (POST)
router.post(
  "/login",
  saveRedirectedUrl, // Middleware to save the redirected URL
  async (req, res, next) => {
    const { username, email, password } = req.body;

    // Check if email, username, or password is missing
    if (!username || !email || !password) {
      req.flash("error", "Please provide a username, email, and password.");
      return res.redirect("/login");
    }

    try {
      // Check if a user with the provided username and email exists
      const user = await User.findOne({ username });
      if (!user || user.email !== email) {
        req.flash("error", "Invalid username or email.");
        return res.redirect("/login"); // Redirect back if username or email doesn't match
      }

      // Validate the password
      const isMatch = await user.authenticate(password); // assuming `authenticate` method is on your User model
      if (!isMatch) {
        req.flash("error", "Invalid password.");
        return res.redirect("/login"); // Redirect back if password is incorrect
      }

      // If all validations pass, proceed to authenticate the user with passport
      next();
    } catch (err) {
      req.flash("error", "An error occurred while processing your login.");
      return res.redirect("/login");
    }
  },
  passport.authenticate("local", {
    failureRedirect: "/login", // Redirect to login page if authentication fails
    failureFlash: true, // Show flash message on failure
  }),
  (req, res) => {
    // Redirect to the original URL or fallback to a default
    const redirectUrl = res.locals.redirectedUrl || "/testlisting";
    req.flash("success", "Welcome back to Wanderlust!");
    res.redirect(redirectUrl); // Redirect to saved or default URL
  }
);

// Logout logic
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.flash("success", "Logged out successfully");
    res.redirect("/testlisting");
  });
});

module.exports = router;
