/**
 * Created by Kamera on 13.12.2018.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);
const UserSchema = new Schema({
    username: {
        type:String,
        requited: true,
        unique: true
    },
    password: {
        type:String,
        minlength:5
    },
    createdAt: {
        type:Date,
        default: Date.now
    }
});

module.exports = mongoose.model('user',UserSchema);