const mongoose = require('mongoose');

/**
 * Enhanced Payment Schema for VNPay/Sepay integration
 * Tracks payment lifecycle from pending to success/failure
 */
const PaymentSchema = new mongoose.Schema({
  orderId: { type: mongoose.Schema.Types.ObjectId, required: true, index: true },
  customerId: { type: mongoose.Schema.Types.ObjectId, required: true },
  
  amount: { type: Number, required: true },
  
  paymentMethod: { type: String, enum: ['SEPAY'], default: 'SEPAY' },
  
  transactionId: String,
  transactionCode: String,
  bankCode: String,
  bankName: String,
  
  status: {
    type: String,
    enum: ['PENDING', 'PROCESSING', 'SUCCESS', 'FAILED', 'CANCELLED', 'REFUNDED'],
    default: 'PENDING',
    index: true
  },
  
  paymentUrl: String,
  redirectUrl: String,
  
  initiatedAt: { type: Date, default: Date.now },
  paidAt: Date,
  failedAt: Date,
  refundedAt: Date,
  
  retryCount: { type: Number, default: 0 },
  errorMessage: String,
  
  description: String,
  metadata: mongoose.Schema.Types.Mixed,
  
  updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = { PaymentSchema };
