const fs = require('fs');

var settings =
{
  db: {
    host: process.env.DB_HOST || process.env.DBHost || 'localhost',
    port: process.env.DB_PORT || process.env.DBPort || 3306,
    user: process.env.DB_USER || process.env.DBUser || 'root',
    password: process.env.DB_PWD || process.env.DBPassword || '',
    database: process.env.DB_NAME || process.env.DBName ||  'budget',

    connectionLimit: 10,
    connectTimeout: 10 * 60 * 1000,
    acquireTimeout: 10 * 60 * 1000,
    timeout: 10 * 60 * 1000,
    multipleStatements: true,
    waitForConnections: true,
    dateStrings : true
  }, 
  // secret: 'SDFGHJKLBHJITYUI34RFBEDFVBY',
  adminDBName: process.env.adminDBName || 'platform_admin_db',
  app_env:process.env.APP_ENV || 'local',

};

module.exports =settings;

