/**
 * Created by Kamera on 13.12.2018.
 */
const mongoose = require('mongoose');

module.exports  = () => {
  mongoose.connect('mongodb://burak:asd.1234@ds135574.mlab.com:35574/movie-api',{useNewUrlParser: true });
    mongoose.connection.on('open',() =>{
       console.log('MongoDB Connected');
    });

    mongoose.connection.on('error',(err) =>{
        console.log('MongoDB: Error',err);
    });

    mongoose.Promise = global.Promise;

};