import jwt from "jsonwebtoken";
import config from "config";

export const auth = (req, res, next) => {
  //get token from header
  const token = req.header("x-auth-token");

  //check with not token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  //verify token
  try {
    const decodedToken = jwt.verify(token, config.get("jwtSecret"));
    req.user = decodedToken.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
