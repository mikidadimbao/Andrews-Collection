const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    filename: String,
    contentType: String,
    url: String,
    title: String,
    description: String,
    uploadDate: Date
});

const Kofia = mongoose.model('Kofia', imageSchema);
const Tracks = mongoose.model('Tracks', imageSchema);
const Pensi = mongoose.model('Pensi', imageSchema);
const Tshirt = mongoose.model('Tshirt', imageSchema);
const Sweta = mongoose.model('Sweta', imageSchema);

module.exports = { Kofia, Tracks, Pensi, Tshirt, Sweta };
