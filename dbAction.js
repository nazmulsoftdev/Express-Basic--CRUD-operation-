const fs = require("fs");

function getDBstudent() {
  return new Promise((resolve, reject) => {
    fs.readFile(`${__dirname}/db.json`, "utf-8", (err, data) => {
      const student = JSON.parse(data);
      resolve(student);
    });
  });
}

function insertDBstudent(students) {
  return new Promise((resolve, reject) => {
    fs.writeFile(`${__dirname}/db.json`, JSON.stringify(students), (err) => {
      resolve("Request Successfully complete !");
    });
  });
}

module.exports = {
  getDBstudent,
  insertDBstudent,
};
