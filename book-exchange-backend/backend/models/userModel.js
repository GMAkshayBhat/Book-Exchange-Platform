/**
 * @file userModel.js
 * @description Description of the file
 * @author G M Akshay Bhat
 * @created 04 19:20
 * @modified 04 19:20
 */


const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  // In your User schema
profilePic: { type: String, default: null },

  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  resetToken: { type: String },  // Token for password reset
  resetTokenExpiration: { type: Date }  // Expiration time for reset token
});


module.exports = mongoose.model('User', userSchema);
