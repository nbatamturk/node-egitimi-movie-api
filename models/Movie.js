/**
 * Created by Kamera on 13.12.2018.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    director_id: Schema.Types.ObjectId,
    title:{
       type: String,
       required: [true,'{PATH} Alanı zorunludur'],
       maxlength : [15,"{PATH} Alanı en fazla {MAXLENGTH} karakter olmalıdır. Girdiğiniz değer:{VALUE}"],
       minlength : [4,"{PATH} Alanı en az {MINLENGTH} karakter olmalıdır. Girdiğiniz değer:{VALUE}"],
   },
   category: {
       type: String,
       maxlength :30,
       minlength : 1
   },
   country: {
       type: String,
       maxlength :30,
       minlength : 1
   },
   year: {
       type: Number,
       max :2040,
       min : 1900
   },
    imdb_score: {
        type: Number,
        max :10,
        min : 0
   },
   createdAt:{
       type:Date,
       default: Date.now
   }
});

module.exports = mongoose.model('movie',MovieSchema);