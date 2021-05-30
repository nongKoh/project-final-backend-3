const express = require('express');
const {addStudent, 
       getAllStudents, 
       getStudent,
       updateStudent,
       deleteStudent
      } = require('../controllers/studentController');

const { addUser,
    updateUser,
    deleteUser,
    userLogin,
    getAllUser } = require('../controllers/userController')

const { addJob,
    getAllJob,
    getJobByUsername,
    updateJobByUser,
    deleteJob } = require('../controllers/jobController')

const router = express.Router();

router.post('/student', addStudent);
router.get('/students', getAllStudents);
router.get('/student/:id', getStudent);
router.put('/student/:id', updateStudent);
router.delete('/student/:id', deleteStudent);

router.post('/User/create', addUser)
router.post('/User/login', userLogin)
router.post('/User/get-all', getAllUser)
router.put('/User/:id', updateUser)
router.delete('/User/:id', deleteUser)

router.post('/Job/create', addJob)
router.post('/Job/get-all', getAllJob)
router.post('/Job/get-by-username',getJobByUsername)
router.put('/Job/update',updateJobByUser)
router.delete('/Job/delete/:id',deleteJob)





module.exports = {
    routes: router
}