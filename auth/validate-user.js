const jwt = require('jsonwebtoken');

module.exports = {
  validateUser,
  getJwtToken
}


function validateUser(user) {
 let errors = [];

  if (!user.username || user.username.length < 2) {
    errors.push("Username must contain at least 2 characters");
  }

  if (!user.password || user.password.length < 4) {
    errors.push("Password must contain at least 4 characters");
  }

  return {
    isSuccessful: errors.length > 0 ? false : true,
    errors
  };
};

function getJwtToken(username){
  const payload = {
    username
  }

const secret = 
process.env.JW_SECRET || 
      "zdUImL0D56qZivj2bv37osNnWFD47NMQCixn8Guy0OfQWptU7hyhLi2zr1zvKF74PrMPiABTZ5zyaxWqJeabmjRw2OlCdLbg6s8zCACOpqRchJEWyY03xLuZDXkODLvp"

const options = {
  expiresIn:'1d'
};
return jwt.sign(payload, secret, options);

};