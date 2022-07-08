var loginModel = require('../Model/login-model')
var helper = require('../common/helper')
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt")

var TOKEN_KEY ="@BhU*EkT#$7127!?"


exports.getLoginPassword = (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
     
      const { email, password } = req.body;

      // Validate user input
      if (!(email && password)) {
        res.status(400).send("All input is required");
      }
      // Validate if user exist in our database
      let user = await loginModel.getLoginPassword(email);
      user = user[0];

      if (user && (await bcrypt.compare(password, user.password))) {
        // Create token
        const token = jwt.sign(
          { user_id: user.id, email,name:user.name },
          TOKEN_KEY,
          {
            expiresIn: "5h",
          }
        );
      
        let row ={
          status: "success",
          statusCode: 200,
          token:token,
          message: "login successful"
        }

        return resolve(row);
      }else{
        let row ={
          status: "reject",
          statusCode: 401,
          message: "unauthorized"
        }

        return reject(row);
      }
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

exports.registerUser = (req, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = req.body;

      // check if user already exists
      let exists = await loginModel.selectQuery(
        `Select id from login_user where email = "${data.email}"`
      )

      if(exists && exists.length>0){
        let row ={
          status: "reject",
          statusCode: 400,
          message: "user alredy exists"
        }
        return reject(row);
      }

      data = helper.addAuditFields("create", data);
      data.password = await bcrypt.hash(data.password, 10);
      delete data.createdby;
      let keys = Object.keys(data);
      let values = Object.values(data);
      

      let insert = await loginModel.insertQuery(
        `insert into login_user(${keys.join(",")}) values(?)`,
        values
      )

    
      let row ={
        status: "success",
        statusCode: 200,
        message: "registration successful"
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
