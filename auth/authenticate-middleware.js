/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const jwt = require("jsonwebtoken");

module.exports = {
  authenticate,
  validateUser,
  getJwtToken
};

function authenticate(req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    const secret =
      process.env.JW_SECRET ||
      "zdUImL0D56qZivj2bv37osNnWFD47NMQCixn8Guy0OfQWptU7hyhLi2zr1zvKF74PrMPiABTZ5zyaxWqJeabmjRw2OlCdLbg6s8zCACOpqRchJEWyY03xLuZDXkODLvp";

    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: "Invalid Credentials" });
      } else {
        req.decodedJwt = decodedToken;
        next();
      }
    });
  } else {
    res.status(400).json({ message: "May I see your credentials, please?" });
  }
}

function validateUser(user) {
  let errors = [];

  if (!user.username || user.username.length < 2) {
    errors.push("Username must contain at least 2 chars");
  }

  if (!user.password || user.password.length < 4) {
    errors.push("Password must contain at least 4 chars");
  }
  return {
    isSuccessful: errors.length > 0 ? false : true
  };
}

function getJwtToken(username) {
  const payload = {
    username
  };

  const secret =
    process.env.JW_SECRET ||
    "zdUImL0D56qZivj2bv37osNnWFD47NMQCixn8Guy0OfQWptU7hyhLi2zr1zvKF74PrMPiABTZ5zyaxWqJeabmjRw2OlCdLbg6s8zCACOpqRchJEWyY03xLuZDXkODLvp";

  const options = {
    expiresIn: "1d"
  };
  return jwt.sign(payload, secret, options);
}
