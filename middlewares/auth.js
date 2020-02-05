const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const header = req.get("Authorization");
  if (!header) {
    return res.status(401).send({ message: "Not Authorized" });
  }
  const token = header.split(" ")[1];
  let decoded;
  try {
    decoded = jwt.verify(token, "somesecretkey");
  } catch {
    return res
      .status(401)
      .send({ message: "Could not process your authentication status" });
  }
  if (!decoded) {
    return res.status(401).send({ message: "Not Authorized" });
  }
  req._id = decoded._id;
  next();
};
