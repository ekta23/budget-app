const jwt = require("jsonwebtoken");
var TOKEN_KEY ="@BhU*EkT#$7127!?"
// exports.tokens = function(req, res, next){
 
//   const token = req.header("auth");

//   if (!token) {
//     return 403;
//   }
//   try {
//     const decoded = jwt.verify(token, TOKEN_KEY);
//     req.user = decoded;
//     return req;
//   } catch (err) {
//     return 400;
//   }
//   return next();
// };

exports.tokens = function (req, token) {
  return new Promise((resolve, reject) => {
    if (!token) {
      token = req.header("Authorization");
    }
    if (token) {
      // verifies secret and checks exp
      jwt.verify(token, TOKEN_KEY, function (err, decoded) {
        if (err) {
          var err = new Error("You are not authenticated!");
          err.status = 401;
          return reject(err);
        } else {
          // if everything is good, save to request for use in other routes
          req.decoded = decoded;
          return resolve(decoded);
        }
      });
    } else {
      var err = new Error("No token provided!");
      err.status = 403;
      return reject(err);
    }
  });
};
