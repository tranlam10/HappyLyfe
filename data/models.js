'use strict';
const mongoose = require('mongoose');
const { User } = require('../users/models');
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const dataSchema = mongoose.Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  gym: { type: Number, required: true },
  sleep: { type: Number, required: true },
  social: { type: Number, required: true },
  diet: { type: Number, required: true },
  mood: { type: Number, required: true }
});

//link user wit model from users/models
//add data

const Data = mongoose.model('Data', dataSchema);

module.exports = { Data };