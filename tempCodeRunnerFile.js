// Import necessary modules
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const Listing = require("./models/listing.js");
const Review = require("./models/reviews.js");

const app = express();

// Middleware
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

// Set up ejs and ejs-mate as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);

// Session middleware setup
const session = require("express-session");
const sessionOptions = {
  secret: process.env.SESSION_SECRET || "mysecretcode",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};
app.use(session(sessionOptions));

// Flash middleware setup
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// Configure passport-local to use the LocalStrategy
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Middleware to set up flash messages globally
app.use((req, res, next) => {
  res.locals.success = req.flash("success") || "";
  res.locals.deleteMsg = req.flash("deleteMsg") || "";
  res.locals.error = req.flash("error") || "";
  res.locals.currUser = req.user || null;

  next();
});

// Route modules
const listings = require("./routes/listing.js");

const userRouter = require("./routes/user.js");
const { isReviewAuthor, isLoggedin } = require("./middleware.js");

// Routes
app.use("/listings", listings);

app.use("/", userRouter);

// Define the /testlisting route
app.get(
  "/testlisting",
  wrapAsync(async (req, res) => {
    const listings = await Listing.find({});
    res.render("./listings/index.ejs", { listings });
  })
);

app.delete(
  "/listings/:listingId/reviews/:reviewId",

  isReviewAuthor,
  async (req, res) => {
    try {
      const review = await Review.findByIdAndDelete(req.params.reviewId);
      if (!review) {
        req.flash("error", "Review not found");
        return res.redirect(`/listings/${req.params.listingId}`);
      }

      // Optionally update the listing to remove the reference to this review
      await Listing.findByIdAndUpdate(req.params.listingId, {
        $pull: { reviews: req.params.reviewId },
      });

      req.flash("success", "Review deleted successfully");
      res.redirect(`/listings/${req.params.listingId}`);
    } catch (err) {
      console.log(err);

      req.flash("error", "Something went wrong");
      res.redirect(`/listings/${req.params.listingId}`);
    }
  }
);

// MongoDB connection setup with retry
const MONGO_URL =
  process.env.MONGO_URL || "mongodb://127.0.0.1:27017/wanderlust";
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to DB");
  } catch (err) {
    console.error("Database connection error:", err.message);
    setTimeout(connectDB, 5000); // Retry connection after 5 seconds
  }
};
connectDB();

// Undefined route handler (for 404 errors)
app.use("*", (req, res, next) => {
  next(new ExpressError(404, `${req.originalUrl} not found`));
});

// Global error handler
app.use((err, req, res, next) => {
  const { statusCode = 500, message = "An unexpected error occurred" } = err;
  if (process.env.NODE_ENV === "development") {
    console.error(err);
  }
  res
    .status(statusCode)
    .render("./listings/error.ejs", { statusCode, message });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server is listening on port", port);
});
