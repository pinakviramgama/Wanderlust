const Listing = require("./models/listing");
const Review = require("./models/reviews");

module.exports.isLoggedin = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirectedUrl = req.originalUrl; // Save the current URL
    req.flash("error", "You must be logged in!");
    return res.redirect("/login"); // Redirect to login
  }
  next(); // Proceed if authenticated
};

module.exports.saveRedirectedUrl = (req, res, next) => {
  if (req.session.redirectedUrl) {
    res.locals.redirectedUrl = req.session.redirectedUrl;
    delete req.session.redirectedUrl; // Clear after use
  }
  next();
};

module.exports.isOwner = async (req, res, next) => {
  const { id } = req.params;
  try {
    const listing = await Listing.findById(id).populate("owner"); // Ensure owner is populated

    if (!listing) {
      req.flash("error", "Listing not found!");
      return res.redirect("/listings");
    }

    // Ensure req.user exists
    if (!req.user || !listing.owner._id.equals(req.user._id)) {
      req.flash("error", "You are not authorized to modify this listing.");
      return res.redirect(`/listings/${id}`);
    }

    next(); // Proceed if the user is the owner
  } catch (err) {
    console.error(err);
    req.flash("error", "Something went wrong.");
    return res.redirect("/listings");
  }
};

module.exports.isReviewAuthor = async (req, res, next) => {
  const { id, reviewId } = req.params; // Listing and Review IDs
  try {
    // Find the review by ID
    const review = await Review.findById(reviewId).populate("author"); // Populate the author field

    // Check if the review exists
    if (!review) {
      req.flash("error", "Review not found.");
      return res.redirect(`/listings/${id}`);
    }

    // Ensure req.user exists before checking for author
    if (
      !req.user ||
      !review.author ||
      !review.author._id.equals(req.user._id)
    ) {
      req.flash("error", "You cannot delete this review");
      return res.redirect(`/listings/${id}`);
    }

    // Proceed if the user is the author
    next();
  } catch (err) {
    console.error(err);
    req.flash("error", "Something went wrong.");
    return res.redirect(`/listings/${id}`);
  }
};
