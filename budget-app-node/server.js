const express = require('express')
const mysql = require('mysql')
const bodyParser = require('body-parser')
const routes = require('./route')
const config = require('./connection')
const app = express()
const port = 5000

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json({ type: 'application/json' }));

app.use("/*", function (request, response, next) {
  response.header("Access-Control-Allow-Credentials", true);
  response.header(
    "Access-Control-Allow-Headers",
    "auth , Origin, X-Requested-With, Content-Type, Accept, Auth"
  );
  response.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  response.removeHeader("X-Powered-By");
  next();
});


routes(app);

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})