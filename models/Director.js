/**
 * Created by Kamera on 13.12.2018.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DirectorSchema = new Schema({
    name: String,
    surname: String,
    bio: String,
    createdAt: {
        type:Date,
        default: Date.now
    }
});

module.exports = mongoose.model('director',DirectorSchema);