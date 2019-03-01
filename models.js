"use strict";

const mongoose = require('mongoose');

const ratingSchema = mongoose.Schema({
    gym: { type: Number, min: 0, max: 5, required: true },
    sleep: { type: Number, min: 0, max: 5, required: true },
    social: { type: Number, min: 0, max: 5, required: true },
    diet: { type: Number, min: 0, max: 5, required: true },
    mood: { type: Number, min: 0, max: 5, required: true }
});

const Rating = mongoose.model("Rating", ratingSchema);

module.exports = { Rating };