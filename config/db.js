const mysql = require("mysql");

async function connectToDB() {
  const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  });

  connection.connect((err) => {
    if (err) {
      console.error("Error connecting to MySQL: ", err.stack);
      return;
    }
    console.log("Connected to MySQL as id " + connection.threadId);
  });

  connection.end();
}

module.exports = connectToDB;
