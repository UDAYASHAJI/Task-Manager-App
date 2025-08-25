const router = require('express').Router();
const { createTask, fetchAllTask ,deleteTaskById,updateTaskById} = require("../Controllers/TaskController");

// ✅ Route to create a task
router.post('/', createTask);

// ✅ Route to fetch all tasks
router.get('/', fetchAllTask);


// ✅ update  tasks
router.delete('/:id',  deleteTaskById);

// ✅ delete task
router.put('/:id', updateTaskById);
module.exports = router;
