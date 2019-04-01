require('dotenv').config();
"use strict";

const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');

const { router: usersRouter } = require('./users');
const { router: authRouter, localStrategy, jwtStrategy } = require('./auth');
const { router: dataRouter } = require('./data');

mongoose.Promise = global.Promise;

const { PORT, DATABASE_URL } = require("./config");
const { Restaurant } = require("./models");

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

passport.use(localStrategy);
passport.use(jwtStrategy);

app.use('/api/users/', usersRouter);
app.use('/api/auth/', authRouter);
app.use('/api/data/', dataRouter);

app.use('*', (req, res) => {
    return res.status(404).json({ message: 'Not Found' });
  });
  
  // Referenced by both runServer and closeServer. closeServer
  // assumes runServer has run and set `server` to a server object
  let server;
  
  function runServer(databaseUrl, port = PORT) {
  
    return new Promise((resolve, reject) => {
      mongoose.connect(databaseUrl, err => {
        if (err) {
          return reject(err);
        }
        server = app.listen(port, () => {
          console.log(`Your app is listening on port ${port}`);
          resolve();
        })
          .on('error', err => {
            mongoose.disconnect();
            reject(err);
          });
      });
    });
  }
  
  function closeServer() {
    return mongoose.disconnect().then(() => {
      return new Promise((resolve, reject) => {
        console.log('Closing server');
        server.close(err => {
          if (err) {
            return reject(err);
          }
          resolve();
        });
      });
    });
  }
  
  if (require.main === module) {
    runServer(DATABASE_URL).catch(err => console.error(err));
  }
  
  module.exports = { app, runServer, closeServer };