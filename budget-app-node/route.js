module.exports = function (app) {

    const cors = require("cors");
    const loginController = require("./Controller/login-controller.js");
    const homeController = require("./Controller/home-controller.js");
    const analyticsController = require("./Controller/analytics-controller.js");
    const verifyToken = require("./middleware/verifyToken.js");


    app.use(function (req, res, next) {
        if (req.headers.origin) {
            if (req.headers.origin.includes("localhost")) {
                res.setHeader("Access-Control-Allow-Methods", "POST, PUT, GET,DELETE, OPTIONS")
                res.setHeader("Access-Control-Allow-Origin", req.headers.origin);
                // res.header("Access-Control-Allow-Origin", "http://localhost:3000");
                res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
                res.header("Access-Control-Allow-Credentials", true);
            }else {
                res.setHeader("Access-Control-Allow-Origin");
            }
        }
        next();
    });

    app.post("/login", function (req, res) {
            loginController
                .getLoginPassword(req, res)
                .then((result) => {
                    return res.status(200).send(result);
                })
                .catch((err) => {
                    return res.status(500).send(err);
                });
        }
    );

    app.post("/register", function (req, res) {
            loginController
                .registerUser(req, res)
                .then((result) => {
                    return res.status(200).send(result);
                })
                .catch((err) => {
                    return res.status(500).send(err);
                });
        }
    );

    app.use(cors())

    app.use(function (req, res, next) {
        if (req.headers.origin) {
            if (req.headers.origin.includes("localhost")) {
                res.setHeader("Access-Control-Allow-Methods", "POST, PUT, GET,DELETE, OPTIONS")
                res.setHeader("Access-Control-Allow-Origin", req.headers.origin);
            }else {
                res.setHeader("Access-Control-Allow-Origin");
            }
        }
        
      
        if(req.header("Authorization")){
            let data = verifyToken.tokens(req, req.header("Authorization")).then(r=>{
                next();
            }).catch(err=>{
                console.log(err,"err");
                return res.status(401).send(err);
            });  
        }else{
            return res.status(401).send("forbidden");
        }
              
    });

    


    app.post("/save-expense", function (req, res) {
            homeController
                .saveExpense(req, res)
                .then((result) => {
                    return res.status(200).send(result);
                })
                .catch((err) => {
                    return res.status(500).send(err);
                });
        }
    );

    app.get("/get-expense", function (req, res) {
            homeController
                .getExpense(req, res)
                .then((result) => {
                    return res.status(200).send(result);
                })
                .catch((err) => {
                    return res.status(500).send(err);
                });
        }
    );

    app.delete("/delete-expense/:expense_id", function (req, res) {
            homeController
                .deleteExpense(req, res)
                .then((result) => {
                    return res.status(200).send(result);
                })
                .catch((err) => {
                    return res.status(500).send(err);
                });
        }
    );

    app.get("/get-categories", function (req, res) {
            analyticsController
                .getCategories(req, res)
                .then((result) => {
                    return res.status(200).send(result);
                })
                .catch((err) => {
                    return res.status(500).send(err);
                });
        }
    );
    app.get("/get-weekwise", function (req, res) {
            analyticsController
                .getWeekwiseData(req, res)
                .then((result) => {
                    return res.status(200).send(result);
                })
                .catch((err) => {
                    return res.status(500).send(err);
                });
        }
    );

    app.get("/get-total", function (req, res) {
            analyticsController
                .getTotal(req, res)
                .then((result) => {
                    return res.status(200).send(result);
                })
                .catch((err) => {
                    return res.status(500).send(err);
                });
        }
    );


    app.get("/get-monthwise", function (req, res) {
            analyticsController
                .getMonthwiseData(req, res)
                .then((result) => {
                    return res.status(200).send(result);
                })
                .catch((err) => {
                    return res.status(500).send(err);
                });
        }
    );

    app.get("/get-yearwise", function (req, res) {
            analyticsController
                .getYearwiseData(req, res)
                .then((result) => {
                    return res.status(200).send(result);
                })
                .catch((err) => {
                    return res.status(500).send(err);
                });
        }
    );

    app.get("/get-bookmarked-expense", function (req, res) {
            homeController
                .bookmarkedExpense(req, res)
                .then((result) => {
                    return res.status(200).send(result);
                })
                .catch((err) => {
                    return res.status(500).send(err);
                });
        }
    );

}