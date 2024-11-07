const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const authorization = req.header("x-auth-token");
  if (!authorization)
    return res.status(401).json({ error: "Unauthorized, token is required" });
  const token = authorization.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ status: 401, message: "Token is not valid" });
  }
};

module.exports = auth;
