const jwt = require("jsonwebtoken");
const { secret } = require("../../config");

module.exports = (roles) => {
  return (req, res, next) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      if (!token) return res.status(403).json({ message: "User unauthorised" });
      const { roles: userRoles } = jwt.verify(token, secret);
      let getAccess = false;
      userRoles.forEach((role) => {
        if (roles.includes(role)) {
          getAccess = true;
        }
      });
      if (!getAccess)
        return res
          .status(403)
          .json({ message: `Access denied. You need to log in` });
      next();
    } catch (error) {
      console.log(error);
      return res.status(403).json({ message: "User unauthorised" });
    }
  };
};
