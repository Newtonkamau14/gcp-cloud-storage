const { Storage } = require("@google-cloud/storage");
const path = require('path')
const gc = new Storage({
  projectId: "property-app-382708",
  keyFilename: path.join(
    __dirname,
    "../../config/property-app-382708-b32d8467c05c.json"
  ),
});
const propertyAppBucket = gc.bucket("property_app");

const uploadImage = (file) => new Promise((resolve, reject) => {
    const { originalname, buffer } = file
  
    const blob = propertyAppBucket.file(originalname.replace(/ /g, "_"))
    const blobStream = blob.createWriteStream({
      resumable: false
    })
  
    blobStream.on('finish', () => {
      const publicUrl = format(
        `https://storage.googleapis.com/${bucket.name}/${blob.name}`
      )
      resolve(publicUrl)
    })
    .on('error', () => {
      reject(`Unable to upload image, something went wrong`)
    })
    .end(buffer)
  
});

module.exports = { uploadImage}