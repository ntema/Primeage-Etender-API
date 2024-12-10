const jwt = require("jsonwebtoken");
const constants = require("../../config/constants")

const verifyToken = async (req, res, next) => {
  const headers = req.headers;
  let token = headers["authorization"];

  if (!token) {
    return res.status(401).json({ error: "Access Denied" });
  }
  token = token.split(" ")[1];
  try {
    const payload = await jwt.verify(
      token,constants.TOKEN_SECRET
    );
    req.user = { _id: payload._id, role: payload.role };
    next();
  } catch (err) {
    return res.status(403).json(err);
  }
};

module.exports = verifyToken;
