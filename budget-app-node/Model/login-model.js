var dbconn = require("../db-connection");

exports.getLoginPassword = (email) => {
  return new Promise((resolve, reject) => {
    let sql =`Select * from login_user where email="${email}" `;
    dbconn.query(sql, function (err, result) {
        if (err) {
          return reject(err);
        } else {
          return resolve(result);
        }
      })
      .catch((err) => {
        return reject(err);
      });
  });
};

exports.selectQuery = (sql) => {
  return new Promise((resolve, reject) => {
    dbconn.query(sql, function (err, result) {
        if (err) {
          return reject(err);
        } else {
          return resolve(result);
        }
      })
      .catch((err) => {
        return reject(err);
      });
  });
};

exports.insertQuery = (sql, values) => {
  return new Promise((resolve, reject) => {
    dbconn.query(sql, [values],function (err, result) {
        if (err) {
          return reject(err);
        } else {
          return resolve(result);
        }
      })
      .catch((err) => {
        return reject(err);
      });
  });
};

