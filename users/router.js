'use strict';
const express = require('express');

const {User} = require('./models');

const router = express.Router();

//Post to register a new user
router.post('/', function(req, res) {
    const requiredFields = ['username', 'password'];
    const missingField = requiredFields.find(function(field) {
      console.log(req.body);
        !(field in req.body);
    });

    if(missingField) {
        return res.statusCode(422).json({
            code: 422,
            reason: 'ValidationError',
            message: 'Missing field',
            location: missingField
        });
    }

    const stringFields = ['username', 'password', 'firstName', 'lastName'];
    const nonStringField = stringFields.find(function(field) {
        return (field in req.body && typeof req.body[field] !== 'string')
    });

    if (nonStringField) {
        return res.status(422).json({
          code: 422,
          reason: 'ValidationError',
          message: 'Incorrect field type: expected string',
          location: nonStringField
        });
    }

    const trimmedFields = ['username', 'password'];
    const nonTrimmedField = trimmedFields.find(function(field) {
        return (req.body[field] !==req.body[field]);
    });

    if (nonTrimmedField) {
        return res.status(422).json({
          code: 422,
          reason: 'ValidationError',
          message: 'Cannot start or end with whitespace',
          location: nonTrimmedField
        });
    }

    const sizedFields = {
        username: {
          min: 1
        },
        password: {
          min: 10,
          // bcrypt truncates after 72 characters, so let's not give the illusion
          // of security by storing extra (unused) info
          max: 72
        }
      };
      const tooSmallField = Object.keys(sizedFields).find(
        field =>
          'min' in sizedFields[field] &&
                req.body[field].trim().length < sizedFields[field].min
      );
      const tooLargeField = Object.keys(sizedFields).find(
        field =>
          'max' in sizedFields[field] &&
                req.body[field].trim().length > sizedFields[field].max
      );
    
      if (tooSmallField || tooLargeField) {
        return res.status(422).json({
          code: 422,
          reason: 'ValidationError',
          message: tooSmallField
            ? `Must be at least ${sizedFields[tooSmallField]
              .min} characters long`
            : `Must be at most ${sizedFields[tooLargeField]
              .max} characters long`,
          location: tooSmallField || tooLargeField
        });
      }
    
      let {username, password, firstName = '', lastName = ''} = req.body;
      // Username and password come in pre-trimmed, otherwise we throw an error
      // before this
      firstName = firstName.trim();
      lastName = lastName.trim();
      console.log('1');
      console.log(username);
      return User.find({username: username})
        .count({username: username}, function(err, count) {
          console.log("5");
          if (err){
            console.log("error");
          } else {
            return count;
          }
        })
        .then(count => {
          console.log("4");
          if (count > 0) {
            console.log("3");
            // There is an existing user with the same username
            return Promise.reject({
              code: 422,
              reason: 'ValidationError',
              message: 'Username already taken',
              location: 'username'
            });
          }
          // If there is no existing user, hash the password
          return User.hashPassword(password);
        })
        .then(hash => {
          console.log('2');
          return User.create({
            username,
            password: hash,
            firstName,
            lastName
          });
        })
        .then(user => {
          console.log('3');
          return res.status(201).json(user.serialize());
        })
        .catch(err => {
          console.log("error");
          // Forward validation errors on to the client, otherwise give a 500
          // error because something unexpected has happened
          if (err.reason === 'ValidationError') {
            return res.status(err.code).json(err);
          }
          res.status(500).json({code: 500, message: 'Internal server error'});
        });
});

router.get('/', (req, res) => {
    return User.find()
      .then(users => res.json(users.map(user => user.serialize())))
      .catch(err => res.status(500).json({message: 'Internal server error'}));
});
  
module.exports = {router};