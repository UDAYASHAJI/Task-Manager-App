
const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    taskName: {
        type: String,
        required: true,
    },
    isDone: {
        type: Boolean,
        required: true,
        default: false // ✅ optional now, defaults to false
    }
});

// ✅ Export correctly
const TaskModel = mongoose.model('Task', TaskSchema);
module.exports = TaskModel;
