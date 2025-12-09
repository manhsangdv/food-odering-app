"use strict";

const mongoose = require('mongoose');

/**
 * Enhanced Menu Schema with category, availability, and detailed info
 */
const MenuSchema = new mongoose.Schema({
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true,
    index: true
  },
  name: {
    type: String,
    required: true
  },
  description: String,
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    enum: ['APPETIZER', 'MAIN', 'DESSERT', 'BEVERAGE', 'COMBO'],
    required: true
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  quantity: {
    type: Number,
    default: -1
  },
  // -1 means unlimited

  image: String,
  preparationTime: Number,
  // in minutes

  nutrition: {
    calories: Number,
    protein: Number,
    fat: Number,
    carbs: Number
  },
  allergens: [String],
  // e.g., ['PEANUTS', 'DAIRY']

  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});
module.exports = {
  MenuSchema
};