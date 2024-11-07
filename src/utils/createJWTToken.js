const jwt = require("jsonwebtoken");

const createJWTToken = async (payload) => {
  return await jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

module.exports = createJWTToken;
