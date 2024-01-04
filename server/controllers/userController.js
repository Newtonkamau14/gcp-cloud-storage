const { User } = require("../models/user.model");
const { uploadImage } = require("../../helpers/helper");
const { Storage } = require("@google-cloud/storage");
const path = require("path");
const { format } = require("util");
const gc = new Storage({
  projectId: "property-app-382708",
  keyFilename: path.join(
    __dirname,
    "../../config/property-app-382708-b32d8467c05c.json"
  ),
});
const propertyAppBucket = gc.bucket("property_app");

const getSignUpPage = (req, res) => {
  res.render("signup");
};

const addUser = async (req, res, next) => {
  try {
    const blob = propertyAppBucket.file(req.file.originalname);
    const blobStream = blob.createWriteStream();

    blobStream.on("error", (err) => {
      next(err);
    });

    blobStream.on("finish", async () => {
      try {
        const publicUrl = format(
          `https://storage.googleapis.com/${propertyAppBucket.name}/${blob.name}`
        );

        // Create the user within the "finish" event
        await User.create({
          username: req.body.username,
          password: req.body.password,
          profilepicture: publicUrl,
        });

        // Send response after successful user creation
        res.status(200).json({ message: "User created successfully" });
      } catch (error) {
        console.error("Error creating user:", error);
        next(error); // Pass the error to error handling middleware
      }
    });

    blobStream.end(req.file.buffer);
  } catch (error) {
    console.error("Error during file upload:", error);
    next(error);
  }
};

module.exports = { getSignUpPage, addUser };
