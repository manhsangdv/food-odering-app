"use strict";

var mongoose = require('mongoose');

/**
 * Enhanced User Schema with customer and restaurant staff separation
 */
var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    index: true
  },
  password: {
    type: String,
    required: true
  },
  userType: {
    type: String,
    "enum": ['CUSTOMER', 'RESTAURANT_STAFF', 'DRIVER', 'ADMIN'],
    "default": 'CUSTOMER'
  },
  firstName: String,
  lastName: String,
  phoneNumber: String,
  defaultAddress: {
    street: String,
    ward: String,
    district: String,
    city: String,
    lat: Number,
    lng: Number
  },
  restaurantId: mongoose.Schema.Types.ObjectId,
  isActive: {
    type: Boolean,
    "default": true
  },
  isVerified: {
    type: Boolean,
    "default": false
  },
  verificationToken: String,
  createdAt: {
    type: Date,
    "default": Date.now,
    index: true
  },
  updatedAt: {
    type: Date,
    "default": Date.now
  },
  lastLoginAt: Date,
  preferences: {
    notifications: {
      type: Boolean,
      "default": true
    },
    darkMode: {
      type: Boolean,
      "default": false
    }
  }
}, {
  timestamps: true
});
module.exports = {
  UserSchema: UserSchema
};