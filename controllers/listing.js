const cloudinary = require("cloudinary").v2; // Use v2 for Cloudinary
const Listing = require("../models/listing");

module.exports.newForm = async (req, res) => {
  res.render("listings/new"); // Render the "new" form for creating a listing
};

module.exports.specificListing = async (req, res) => {
  const { id } = req.params;
  try {
    const listing = await Listing.findById(id)
      .populate({
        path: "reviews",
        populate: {
          path: "author",
        },
      })
      .populate("owner");

    if (!listing) {
      req.flash("error", "Listing not found!");
      return res.redirect("/listings");
    }

    res.render("listings/show", { listing });
  } catch (err) {
    req.flash("error", "Error fetching the listing details.");
    res.redirect("/listings");
  }
};

module.exports.editForm = async (req, res) => {
  const { id } = req.params;

  try {
    const listing = await Listing.findById(id);
    if (!listing) {
      req.flash("error", "Listing not found!");
      return res.redirect("/listings");
    }

    let originalImageUrl = listing.image?.url || "";

    // Check if image URL is from GraphCMS (Hygraph) and apply transformations
    if (originalImageUrl.includes("media.graphassets.com")) {
      originalImageUrl = `${originalImageUrl}?width=300&height=300&fit=crop`; // Adjusting GraphCMS URL
    }

    // Check if image URL is from Unsplash and apply transformations
    if (originalImageUrl.includes("images.unsplash.com")) {
      // Change the width (default from Unsplash URL) and add quality parameter
      originalImageUrl = originalImageUrl
        .replace(/w=\d+/, "w=300")
        .replace(/q=\d+/, "q=60");
    }

    res.render("listings/edit", { listing, originalImageUrl });
  } catch (err) {
    console.error("Error in editForm:", err);
    req.flash("error", "An unexpected error occurred.");
    res.redirect("/listings");
  }
};

module.exports.updateForm = async (req, res) => {
  const { id } = req.params;

  if (req.file) {
    try {
      // Upload image to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "your-folder-name", // Optional, specify a folder in Cloudinary
      });

      // Get Cloudinary URL and public ID
      const url = result.secure_url;
      const filename = result.public_id;

      // Update the listing with new image
      const updatedListing = await Listing.findByIdAndUpdate(
        id,
        {
          ...req.body.listing,
          image: { url, filename }, // Store the Cloudinary URL and filename
        },
        { new: true }
      );

      req.flash("success", "Listing updated successfully!");
      res.redirect(`/listings/${updatedListing._id}`);
    } catch (error) {
      req.flash("error", "Error uploading image to Cloudinary!");
      res.redirect("back");
    }
  } else {
    try {
      const updatedListing = await Listing.findByIdAndUpdate(
        id,
        { ...req.body.listing },
        { new: true }
      );

      req.flash("success", "Listing updated successfully!");
      res.redirect(`/listings/${updatedListing._id}`);
    } catch (error) {
      req.flash("error", "Error updating listing!");
      res.redirect("back");
    }
  }
};

module.exports.newListing = async (req, res) => {
  if (!req.file) {
    req.flash("error", "No file uploaded!");
    return res.redirect("/newlisting");
  }

  // Get the path and filename from the uploaded file
  let url = req.file.path; // This should be the full path or Cloudinary URL
  let filename = req.file.filename;

  // Create a new listing object
  const listing = new Listing(req.body.listing);

  // Store the image as an object containing both URL and filename
  listing.image = { url, filename };

  listing.owner = req.user._id;

  try {
    // Save the new listing to the database
    await listing.save();

    req.flash("success", "New listing created successfully!");
    res.redirect("/testlisting");
  } catch (err) {
    console.error("Error saving listing: ", err);
    req.flash("error", "Something went wrong while saving the listing.");
    res.redirect("/newlisting");
  }
};

module.exports.deleteForm = async (req, res) => {
  const { id } = req.params;
  try {
    const listing = await Listing.findById(id);

    if (!listing) {
      req.flash("error", "Listing not found!");
      return res.redirect("/listings");
    }

    // Delete image from Cloudinary
    if (listing.image.filename) {
      await cloudinary.uploader.destroy(listing.image.filename); // Use the public_id stored in the database
    }

    // Delete the listing from the database
    await Listing.findByIdAndDelete(id);

    req.flash("success", "Listing deleted successfully!");
    res.redirect("/testlisting");
  } catch (err) {
    console.error("Error deleting listing:", err);
    req.flash("error", "Error deleting listing!");
    res.redirect("/listings");
  }
};
