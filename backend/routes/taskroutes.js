const express=require('express');
const router=express.Router();
const taskControllers=require('../controllers/taskController')
//get all tasks
router.get('/tasks',taskControllers.getTasks);

// POST a new task
router.post('/tasks',taskControllers.postTasks);

//delete task
router.use('/delete/:id',taskControllers.deletetask);

//delete task
router.use('/edit/:id',taskControllers.editTask);

//search task
router.use('/search',taskControllers.searchtask);

module.exports=router;