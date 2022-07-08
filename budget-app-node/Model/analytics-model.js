var dbconn = require("../db-connection");

exports.getCategories = (login_id) => {
  return new Promise((resolve, reject) => {
    let sql =`SELECT expense_category as name ,sum(expense_amount) as y from expense where login_user_id=${login_id} GROUP BY expense_category`;
    dbconn.query(sql,  function (err, result) {
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


exports.getWeekwiseData = (login_id) => {
  return new Promise((resolve, reject) => {
    let sql =`SELECT sum(expense_amount) y,DATE_FORMAT(expense_date,'%W') "name" from expense where login_user_id=${login_id} and  DATEDIFF(CURRENT_DATE,expense_date)<=7 group by DATE_FORMAT(expense_date,'%W') order by expense_id`;
    dbconn.query(sql,  function (err, result) {
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


exports.getTotalExpense = (login_id) => {
  return new Promise((resolve, reject) => {
    let sql =`SELECT sum(expense_amount) FROM expense where login_user_id=${login_id}`;
    dbconn.query(sql,  function (err, result) {
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

exports.getYearlyExpense = (login_id) => {
  return new Promise((resolve, reject) => {
    let sql =`SELECT sum(expense_amount) as amount FROM expense where login_user_id=${login_id} and year(CURRENT_DATE) = year(expense_date)`;
    dbconn.query(sql,  function (err, result) {
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

exports.getMonthlyExpense = (login_id) => {
  return new Promise((resolve, reject) => {
    let sql =`SELECT sum(expense_amount) as amount FROM expense where login_user_id=${login_id} and month(CURRENT_DATE) = month(expense_date) and  year(CURRENT_DATE) = year(expense_date)`;
    dbconn.query(sql,  function (err, result) {
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

exports.getTotalExpense = (login_id) => {
  return new Promise((resolve, reject) => {
    let sql =`SELECT sum(expense_amount) as amount FROM expense where login_user_id=${login_id}`;

    dbconn.query(sql,  function (err, result) {
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

exports.getYearwiseData = (login_id) => {
  return new Promise((resolve, reject) => {
    let sql =`SELECT sum(expense_amount) y, date_format(expense_date, '%M') "name" FROM expense where login_user_id=${login_id} group by year(expense_date) order by expense_id;`;

    dbconn.query(sql,  function (err, result) {
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


exports.getMonthwiseData = (login_id) => {
  return new Promise((resolve, reject) => {
    let sql =`SELECT Day(expense_date) "name",sum(expense_amount) y from expense  WHERE login_user_id=${login_id} and MONTH(expense_date) = MONTH(CURRENT_DATE()) and YEAR(expense_date)=YEAR(CURRENT_DATE) group by DAY(expense_date)`;

    dbconn.query(sql,  function (err, result) {
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