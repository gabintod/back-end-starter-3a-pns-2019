const { Router } = require('express');
const { Student } = require('../../models');

const router = new Router();

function getByName(name) {
  const students = Student.get();
  const targets = [];

  students.forEach((std) => {
    if (std.name.toLowerCase().includes(name.toLowerCase())) targets.push(std);
  });

  return targets;
}

function getByFirstname(firstname) {
  const students = Student.get();
  const targets = [];

  students.forEach((std) => {
    if (std.firstname.toLowerCase().includes(firstname.toLowerCase())) targets.push(std);
  });

  return targets;
}

router.get('/', (req, res) => res.status(200).json(Student.get()));
router.post('/', (req, res) => {
  try {
    const student = Student.create(req.body);
    res.status(201).json(student);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra);
    } else {
      res.status(500).json(err);
    }
  }
});

router.get('/:studentId', (req, res) => res.status(200).json(Student.getById(req.params.studentId)));

router.get('/name/:studentName', (req, res) => res.status(200).json(getByName(req.params.studentName)));

router.get('/firstname/:studentFirstname', (req, res) => res.status(200).json(getByFirstname(req.params.studentFirstname)));

router.delete('/:studentId', (req, res) => res.status(200).json(Student.delete(req.params.studentId)));

router.put('/:studentId', (req, res) => res.status(200).json(Student.update(req.params.studentId, req.body)));

module.exports = router;
