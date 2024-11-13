// generateJwtSecret.js
const crypto = require('crypto');

// Generate a random 256-bit JWT secret (32 bytes)
const jwtSecret = crypto.randomBytes(32).toString('hex');

// Print the secret to the console
console.log("Generated JWT Secret:", jwtSecret);
