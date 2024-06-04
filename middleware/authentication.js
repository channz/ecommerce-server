const jwt = require("jsonwebtoken");

function generateJWT(user) {
  const payload = {
    id: user.id,
    role: user.role,
  };

  return jwt.sign(payload, process.env, JWT_SECRET, { expiresIn: "1h" });
}

const auth = (req, res, next) => {
  try {
    const authorizedRoles = {
      "/api/products": ["SELLER"],
      "/api/orders": ["BUYER", "SELLER"],
    };

    const currentPath = req.originalUrl;

    if (authorizedRoles[currentPath]) {
      if (authorizedRoles[currentPath].includes(req.user.role)) {
        req.user = user;
        next();
      } else {
        return res.status(403).send({
          status: false,
          message: "Forbidden: Access denied for this role",
        });
      }
    } else {
      next();
    }
  } catch (error) {
    res.status(401).send({
      status: false,
      message: "access unauthorized",
    });
  }
};

module.exports = {
  generateJWT,
  auth,
};
