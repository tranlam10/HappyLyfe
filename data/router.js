'use strict';
const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const router = express.Router();
const jwt = require('jsonwebtoken');

const { Data } = require('./models');
const { User } = require('../users/models');

const jwtAuth = passport.authenticate('jwt', {session: false});

router.get("/show", jwtAuth, function(req, res) {
    Data
        .find( { userId: req.query.userId } )
        .sort({date: -1})
        .then(function(posts) {
            res.json(posts);
        })
        .catch(function(err) {
            res.status(500).json({ error: 'something went terribly wrong' });
        });
});

router.post('/', jsonParser, function(req, res) {
    // const requiredFields = ['username', 'date', 'gym', 'sleep', 'social', 'diet', 'mood'];
    // for (let i = 0; i < requiredFields.length; i++) {
	// 	const field = requiredFields[i];
	// 	if (!(field in req.body)) {
	// 		const message = `Missing ${field} in request body`;
	// 		console.error(message);
	// 		return res.status(400).send(message);
	// 	}
    // }
    console.log("go to post route");
    Data
    .create(req.body)
    .then(data => res.status(201).json(data))
    .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong' });
    });
});

router.put('/:id', jsonParser, function(req,res) {
    //const requiredFields = 
    Data
    .findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    .then(function(data) {
        console.log(data);
        return res.status(200).json(data);
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong' });
    });
});

router.delete('/', jsonParser, function (req, res) {
    console.log(req.body.id);
    Data
        .findByIdAndDelete(req.body.id)
        .then(function() {
            console.log('DELETE SUCCESS!');
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Something went wrong' });
        });
});

module.exports = {router};