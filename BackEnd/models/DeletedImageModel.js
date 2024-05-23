const mongoose = require('mongoose');

const deletedImageSchema = new mongoose.Schema({
    phoneNumber: String,
    imageId: String,
    category: String,
    filename: String,
    contentType: String,
    url: String,
    title: String,
    description: String,
    uploadDate: Date
});

const DeletedImageModel = mongoose.model('DeletedImage', deletedImageSchema);

module.exports = DeletedImageModel;
