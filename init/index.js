const mongoose = require("mongoose");
const data = require("./data.js"); // Import your data file

const Listing = require("../models/listing.js"); // Import the Listing model

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

// Connect to MongoDB
main()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.error("DB Connection Error:", err);
  });

async function main() {
  await mongoose.connect(MONGO_URL); // Establish connection to MongoDB
}

// Initialize and seed database
const initDB = async () => {
  try {
    await Listing.deleteMany({}); // Clear the existing data from the Listing collection

    // Prepare data with the owner field
    const seedData = data.data.map((obj) => ({
      ...obj,
      owner: "676e9f8afb5fc26d93e0e106", // Default owner ID
    }));

    await Listing.insertMany(seedData); // Insert data into the database
    console.log("Data is initialized and inserted successfully");
  } catch (error) {
    console.error("Error during DB initialization:", error);
  }
};

// Call the database initialization function
initDB();
