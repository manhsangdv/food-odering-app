"use strict";

const mongoose = require('mongoose');

/**
 * Enhanced Delivery Schema with ETA calculation support
 * Stores delivery information including distance and estimated time of arrival
 */
const DeliverySchema = new mongoose.Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    index: true
  },
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  driverId: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    index: true
  },
  restaurantLocation: {
    lat: Number,
    lng: Number
  },
  customerLocation: {
    lat: Number,
    lng: Number
  },
  distanceKm: {
    type: Number
  },
  etaMinutes: {
    type: Number
  },
  status: {
    type: String,
    enum: ['CREATED', 'CONFIRMED', 'ASSIGNED', 'AT_RESTAURANT', 'PICKED_UP', 'DELIVERING', 'COMPLETED', 'CANCELLED'],
    default: 'CONFIRMED'
  },
  assignedAt: Date,
  arrivedAt: Date,
  pickedAt: Date,
  startedAt: Date,
  completedAt: Date,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});
module.exports = {
  DeliverySchema
};