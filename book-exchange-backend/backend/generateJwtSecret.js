/**
 * @file generateJwtSecret.js
 * @description Description of the file
 * @author G M Akshay Bhat
 * @created 05 19:21
 * @modified 05 19:21
 */


const crypto = require('crypto');

// Generate a random 256-bit JWT secret (32 bytes)
const jwtSecret = crypto.randomBytes(32).toString('hex');

// Print the secret to the console
console.log("Generated JWT Secret:", jwtSecret);
