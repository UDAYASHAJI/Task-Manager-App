const TaskModel = require("../Models/TaskModel"); // ✅ Import your schema

// Create Task
const createTask = async (req, res) => {
  const data = req.body;

  try {
    const model = new TaskModel(data);
    await model.save();

    res.status(201).json({
      message: "Task is created",
      success: true,
      task: model,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to create task",
      success: false,
      error: err.message,
    });
  }
};

// Update Task by ID
const updateTaskById = async (req, res) => {
  const id = req.params.id;
  const body = req.body;

  try {
    const updatedTask = await TaskModel.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true } // ✅ return the updated document
    );

    if (!updatedTask) {
      return res.status(404).json({
        message: "Task not found",
        success: false,
      });
    }

    res.status(200).json({
      message: "Task is updated",
      success: true,
      task: updatedTask,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to update task",
      success: false,
      error: err.message,
    });
  }
};

// Delete Task by ID
const deleteTaskById = async (req, res) => {
  const id = req.params.id;

  try {
    const deletedTask = await TaskModel.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({
        message: "Task not found",
        success: false,
      });
    }

    res.status(200).json({
      message: "Task is deleted",
      success: true,
      task: deletedTask,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to delete task",
      success: false,
      error: err.message,
    });
  }
};

// Fetch all tasks
const fetchAllTask = async (req, res) => {
  try {
    const tasks = await TaskModel.find({});

    res.status(200).json({
      message: "All tasks fetched",
      success: true,
      tasks,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to find tasks",
      success: false,
      error: err.message,
    });
  }
};

module.exports = { createTask, fetchAllTask, deleteTaskById, updateTaskById };
