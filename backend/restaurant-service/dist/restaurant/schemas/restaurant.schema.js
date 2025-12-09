"use strict";

const mongoose = require('mongoose');

/**
 * Enhanced Restaurant Schema with complete information
 * Includes location, operating hours, ratings, and status management
 */
const RestaurantSchema = new mongoose.Schema({
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    index: true
  },
  name: {
    type: String,
    required: true,
    index: true
  },
  description: String,
  phoneNumber: String,
  email: String,
  address: {
    street: String,
    ward: String,
    district: String,
    city: String
  },
  location: {
    lat: {
      type: Number,
      required: true
    },
    lng: {
      type: Number,
      required: true
    }
  },
  operatingHours: {
    monday: {
      open: String,
      close: String,
      isOpen: Boolean
    },
    tuesday: {
      open: String,
      close: String,
      isOpen: Boolean
    },
    wednesday: {
      open: String,
      close: String,
      isOpen: Boolean
    },
    thursday: {
      open: String,
      close: String,
      isOpen: Boolean
    },
    friday: {
      open: String,
      close: String,
      isOpen: Boolean
    },
    saturday: {
      open: String,
      close: String,
      isOpen: Boolean
    },
    sunday: {
      open: String,
      close: String,
      isOpen: Boolean
    }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  totalReviews: {
    type: Number,
    default: 0
  },
  totalOrders: {
    type: Number,
    default: 0
  },
  logo: String,
  banner: String,
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  verifiedAt: Date
}, {
  timestamps: true
});
module.exports = {
  RestaurantSchema
};