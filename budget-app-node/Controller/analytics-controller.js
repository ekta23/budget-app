var analyticsModel = require('../Model/analytics-model')

exports.getCategories = (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      let login_id = req.decoded.user_id;
      let data = await analyticsModel.getCategories(login_id);
     
      let row ={ 
        status: "success",
        statusCode: 200,
        data:data
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

exports.getWeekwiseData = (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      let login_id = req.decoded.user_id;
      let data = await analyticsModel.getWeekwiseData(login_id);
      
     
      let row ={ 
        status: "success",
        statusCode: 200,
        data:data
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

exports.getTotal = (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      let login_id = req.decoded.user_id;
      let totalExpense = await analyticsModel.getTotalExpense(login_id);
      let yearlyExpense = await analyticsModel.getYearlyExpense(login_id);
      let monthlyExpense = await analyticsModel.getMonthlyExpense(login_id);

     
      let row ={ 
        status: "success",
        statusCode: 200,
         data    : {totalExpense,
        yearlyExpense,
        monthlyExpense}
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

exports.getMonthwiseData = (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      let login_id = req.decoded.user_id;
      let data = await analyticsModel.getMonthwiseData(login_id);
      
     
      let row ={ 
        status: "success",
        statusCode: 200,
        data:data
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

exports.getYearwiseData = (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      let login_id = req.decoded.user_id;
      let data = await analyticsModel.getYearwiseData(login_id);
      
     
      let row ={ 
        status: "success",
        statusCode: 200,
        data:data
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