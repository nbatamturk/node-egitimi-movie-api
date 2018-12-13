const express = require('express');
const router = express.Router();

// Models
const Director = require('../models/Director.js');

router.post('/',(req,res) => {
   const director = new Director(req.body);
    const promise = director.save();

    promise.then((data) => {
        res.json(data);
    }).catch((err)=>{
        res.json(err);
    });

});

router.get('/',(req,res) => {
    const promise = Director.aggregate([
        {
            $lookup:{
                from: 'movies',
                localField: '_id',
                foreignField: 'director_id',
                as: 'movies'
            }
        },
        {
            $undwind:{
                path: '$movies',
                preserveNullAndEmptyArrays:true
            }
        },
        {
            $group: {
                _id:{
                    _id: '$id',
                    name: '$name',
                    surname: '$name',
                    bio: '$name'
                },
                movies:{
                    $push: '$movies'
                }
            }
        }
    ]);
    promise.then((data) => {
        res.json(data);
    }).catch((err)=>{
        res.json(err);
    });
});


module.exports = router;