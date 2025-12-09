"use strict";

const mongoose = require('mongoose');

/**
 * Enhanced Order Schema with complete order lifecycle tracking
 * Status flow: CREATED → CONFIRMED → PREPARING → DELIVERING → COMPLETED
 * or: CREATED/PAID → CANCELLED
 */
const OrderSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    index: true
  },
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true,
    index: true
  },
  items: [{
    menuItemId: mongoose.Schema.Types.ObjectId,
    name: String,
    price: Number,
    quantity: {
      type: Number,
      default: 1
    },
    notes: String
  }],
  subtotal: {
    type: Number,
    required: true
  },
  deliveryFee: {
    type: Number,
    default: 0
  },
  total: {
    type: Number,
    required: true
  },
  paymentMethod: {
    type: String,
    enum: ['COD', 'ONLINE', 'STRIPE'],
    required: true
  },
  deliveryAddress: {
    street: String,
    ward: String,
    district: String,
    city: String
  },
  recipientName: {
    type: String
  },
  recipientPhone: {
    type: String
  },
  customerLocation: {
    lat: Number,
    lng: Number
  },
  status: {
    type: String,
    enum: ['CREATED', 'CONFIRMED', 'PREPARING', 'READY', 'DELIVERING', 'COMPLETED', 'CANCELLED', 'PENDING_PAYMENT', 'PAYMENT_FAILED'],
    default: 'CREATED',
    index: true
  },
  notes: String,
  distanceKm: Number,
  etaMinutes: Number,
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  },
  confirmedAt: Date,
  preparingAt: Date,
  readyAt: Date,
  deliveringAt: Date,
  completedAt: Date,
  cancelledAt: Date,
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});
module.exports = {
  OrderSchema
};