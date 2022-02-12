const dotenv = require("dotenv");
const users = require("./sampleData/users");
const User = require("./models/userModel");
const connectDB = require("./config/db");

dotenv.config();

connectDB();

// Importing data into MongoDB
const importData = async () => {
  try {
    await User.deleteMany(); // deletes all of the documents

    await User.insertMany(users); // Inserting users

    console.log("User Data Imported!");
    process.exit();
  } catch (error) {
    console.log(`${error}`);
    process.exit(1);
  }
};

// Deleting data from MongoDB
const deleteData = async () => {
  try {
    await User.deleteMany(); // deletes all of the user data

    console.log("User Data Deleted!");
    process.exit();
  } catch (error) {
    console.log(1);
  }
};

// Running the file:
// node backend/dataSeeder -d  ----- for deleting user data
// node backend/dataSeeder ----- for importing user data
if (process.argv[2] === "-d") {
  deleteData();
} else {
  importData();
}
