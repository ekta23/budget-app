var homeModel = require('../Model/home-model')

exports.saveExpense = (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      let login_id = req.decoded.user_id;
      let data = req.body;

      delete data.row_id;
      delete data.timestamp;

      console.log("hey");
     
      let values = Object.values(data);
      let keys = Object.keys(data);
      keys.push("login_user_id");
      values.push(login_id);

      let save_expense = await homeModel.saveExpense(keys, values);
      
      let row ={ 
        status: "success",
        statusCode: 200,
        message: "Row inserted!!"
      }

      return resolve(row);
    } catch (err) {
      console.log(err);
      let row = {
        status: "error",
        statusCode: 500,
        message: err,
      };
      return reject(row);
    }
  });
};

exports.getExpense = (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      let login_id = req.decoded.user_id;
      let data = await homeModel.getExpense(login_id);
      
      let row ={ 
        data,
        status: "success",
        statusCode: 200,
        message: "data fetched"
      }

      return resolve(row);
    } catch (err) {
      console.log(err);
      let row = {
        status: "error",
        statusCode: 500,
        message: err,
      };
      return reject(row);
    }
  });
};

exports.deleteExpense = (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      let expense_id = req.params.expense_id;
      let data = await homeModel.deleteExpense(expense_id);
      
      let row ={ 
        data,
        status: "success",
        statusCode: 200,
        message: "data deleted"
      }

      return resolve(row);
    } catch (err) {
      console.log(err);
      let row = {
        status: "error",
        statusCode: 500,
        message: err,
      };
      return reject(row);
    }
  });
};

exports.bookmarkedExpense = (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      let login_id = req.decoded.user_id;
      let data = await homeModel.getBookmarkedExpense(login_id);
      
      let row ={ 
        data,
        status: "success",
        statusCode: 200,
        message: "data fetched"
      }

      return resolve(row);
    } catch (err) {
      console.log(err);
      let row = {
        status: "error",
        statusCode: 500,
        message: err,
      };
      return reject(row);
    }
  });
};
