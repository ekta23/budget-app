var dbconn = require("../db-connection");

exports.saveExpense = (key,data) => {
  return new Promise((resolve, reject) => {
    let sql =`insert into expense(${key.join(",")}) values(?) `;
    dbconn.query(sql, [data],  function (err, result) {
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

exports.getExpense = (id) => {
  return new Promise((resolve, reject) => {
    let sql =`select * from expense where login_user_id=?`;
    dbconn.query(sql, id,  function (err, result) {
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

exports.getBookmarkedExpense = (id) => {
  return new Promise((resolve, reject) => {
    let sql =`select * from expense where expense_is_bookmarked=1 and login_user_id=?`;
    dbconn.query(sql, id,  function (err, result) {
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

exports.deleteExpense = (id) => {
  return new Promise((resolve, reject) => {
    let sql =`delete from expense where expense_id=?`;
    dbconn.query(sql, id,  function (err, result) {
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

