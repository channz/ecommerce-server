const bcrypt = require("bcrypt");

function hashpw(myPlaintextPassword) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(myPlaintextPassword, 10, function (err, hash) {
      if (err) {
        reject(err);
      } else {
        resolve(hash);
      }
    });
  });
}

function comparepw(myPlaintextPassword, hash) {
  return new Promise((resolve, reject) => {
    console.log({ myPlaintextPassword, hash });
    bcrypt.compare(myPlaintextPassword, hash, function (err, result) {
      // result == true
      if (err) {
        reject(err);
      } else {
        resolve(true);
      }
    });
  });
}

module.exports = { hashpw, comparepw };
