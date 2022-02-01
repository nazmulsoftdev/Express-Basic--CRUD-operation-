const Db = require("../dbAction");
const express = require("express");
const router = express.Router();

// get  student list from json db

const StudentList = (req, res) => {
  const id = parseInt(req.params.id);
  Db.getDBstudent().then((students) => {
    res.send(students);
  });
};

// post new student in json db

const PostStudent = (req, res) => {
  const addMember = req.body;
  Db.getDBstudent().then((student) => {
    student.push(addMember);
    Db.insertDBstudent().then((student) => {
      res.send(student);
    });
  });
};

// get specific student from json db

const findStudent = (req, res) => {
  const id = parseInt(req.params.id);
  Db.getDBstudent().then((students) => {
    const student = students.find((s) => s.id === id);
    if (!student) res.status(404).send("Sorry this user not found !");
    else res.send(student);
  });
};

// Edit request

const editStudent = (req, res) => {
  const id = parseInt(req.params.id);
  const updatedData = req.body;
  Db.getDBstudent().then((students) => {
    const student = students.find((s) => s.id === id);
    if (!student) res.status(404).send("No student found with this id!");
    else {
      const i = students.findIndex((s) => s.id === id);
      students[i] = updatedData;
      Db.insertDBstudent(students).then((msg) => res.send(updatedData));
    }
  });
};

// Delete specific student

const DeleteStudent = (req, res) => {
  const id = parseInt(req.params.id);
  Db.getDBstudent().then((students) => {
    const student = students.find((s) => s.id === id);
    if (!student) res.status(404).send("Sorry this user not found");
    const updatedStudent = students.filter((s) => s.id !== id);
    Db.insertDBstudent(updatedStudent).then((student) => res.send(student));
  });
};

// add express routing

router.route("/").get(StudentList);
router
  .route("/:id")
  .get(findStudent)
  .post(PostStudent)
  .put(editStudent)
  .delete(DeleteStudent);

module.exports = router;
