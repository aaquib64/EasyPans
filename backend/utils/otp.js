const crypto = require('crypto');

const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const hashOtp = (otp) => {
  if (!otp) {
    throw new Error("OTP is missing while hashing");
  }

  return crypto
    .createHash("sha256")
    .update(String(otp))
    .digest("hex");
};

module.exports = {
  generateOtp,
  hashOtp,
};
