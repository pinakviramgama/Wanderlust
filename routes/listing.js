const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");
const Listing = require("../models/listing");
const { reviewSchema } = require("../Schema");
const { isLoggedin, isOwner } = require("../middleware");
const listingController = require("../controllers/listing.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

// Middleware to validate reviews
const validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const errorMessage = error.details.map((el) => el.message).join(", ");
    throw new ExpressError(400, errorMessage);
  }
  next();
};

// Route for creating a new listing form
router.get("/new", isLoggedin, wrapAsync(listingController.newForm));

// Route for a specific listing
router
  .route("/:id")
  .get(wrapAsync(listingController.specificListing)) // Show a specific listing
  .put(
    isLoggedin,
    isOwner,
    upload.single("listing[image]"),
    wrapAsync(listingController.updateForm)
  ) // Update a listing
  .delete(isLoggedin, isOwner, wrapAsync(listingController.deleteForm)); // Delete a listing

// Render the edit form for a specific listing
router.get(
  "/:id/edit",
  isLoggedin,
  isOwner,
  wrapAsync(listingController.editForm)
);

// Route to create a new listing
router.post(
  "/",
  isLoggedin, // Ensure user is logged in
  upload.single("listing[image]"), // Handle image upload
  wrapAsync(listingController.newListing)
);

module.exports = router;
