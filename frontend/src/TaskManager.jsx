import React, { useState, useEffect } from "react";
import {
  FaPlus,
  FaSearch,
  FaCheck,
  FaPencilAlt,
  FaTrash,
} from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import { CreateTask, DeleteTaskById, GetAllTasks, UpdateTaskById } from "./api";
import { notify } from "./utils";

const TaskManager = () => {
  const [input, setInput] = useState("");
  const [tasks, setTask] = useState([]);
  const [copyTasks, setCopyTasks] = useState([]);
  const [updateTask,setUpdateTask]=useState(null);


  const handleTask=()=>
  {
    if(updateTask && input)
    {
      //update api call
console.log('update api call....');
const obj={
  taskName:input,
  isDone:updateTask,
  _id:updateTask._id
}
handleUpdateItem(obj);

    }
    else if(updateTask===null && input)
    {
      console.log('create api call..');
      
      handleAddTask();

    }
  }


  useEffect(()=>{
    if(updateTask)
    {
      setInput(updateTask.taskName);
    }
  },[updateTask])

  const handleAddTask = async () => {
    const obj = {
      taskName: input,
      isDone: false,
    };

    try {
      const { success, message } = await CreateTask(obj);

      if (success) {
        notify(message, "success");
        fetchAllTask();
      } else {
        notify(message, "error");
      }

      setInput("");
    } catch (err) {
      console.error(err);
      notify("Failed to create task", "error");
    }
  };

  const fetchAllTask = async () => {
    try {
      const data = await GetAllTasks();
      setTask(data.tasks);
      setCopyTasks(data.tasks);
    } catch (err) {
      console.error(err);
      notify("Failed to fetch tasks", "error");
    }
  };
useEffect(() => {
    fetchAllTask();
  }, []);


 // Delete Task
const handleDeleteTask = async (id) => {
  try {
    const response = await DeleteTaskById(id); 
    // Assuming response.data has success/message
    const { success, message } = response;
    if (success) {
      setTask((prev) => prev.filter((task) => task._id !== id));
      setCopyTasks((prev) => prev.filter((task) => task._id !== id));
      notify(message || "Task deleted successfully", "success");
    } else {
      notify(message || "Failed to delete task", "error");
    }
  } catch (err) {
    console.error(err);
    notify("Failed to delete task", "error");
  }
};

// Check/Uncheck Task
const handleCheckAndUncheck = async (item) => {
  const { _id, isDone, taskName } = item;
  const updatedTask = { taskName, isDone: !isDone };

  try {
    const response = await UpdateTaskById(_id, updatedTask);
    const { success, message } = response;
    if (success) {
      setTask((prev) =>
        prev.map((task) => (task._id === _id ? { ...task, isDone: !isDone } : task))
      );
      setCopyTasks((prev) =>
        prev.map((task) => (task._id === _id ? { ...task, isDone: !isDone } : task))
      );
      notify(message || "Task updated successfully", "success");
    } else {
      notify(message || "Failed to update task", "error");
    }
  } catch (err) {
    console.error(err);
    notify("Failed to update task", "error");
  }
};

const handleUpdateItem = async (item) => {
  if (!item) {
    console.error("handleUpdateItem called with undefined item");
    return;
  }

  const { _id, isDone, taskName } = item;
  const obj = {
    taskName,
    isDone: !isDone
  };

  try {
    const { success, message } = await UpdateTaskById(_id, obj);

    if (success) {
      notify(message || "Task updated successfully", "success");
    } else {
      notify(message || "Failed to update task", "error");
    }

    fetchAllTask(); // refresh tasks
  } catch (err) {
    console.error(err);
    notify("Failed to update task", "error");
  }
};



  


  return (
    <div className="d-flex flex-column align-tems-center w-50 m-auto mt-5">
      <h1 className="mb-4 ml-5"> Task Manager App</h1>
<div className="d-flex justify-content-between align-items-center mb-4 w-100">
        <div className="input-group flex-grow-1 me-1">
          <input
            type="text"
            className="form-control me-1"
            placeholder="add a new task"
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />
          <button
            className="btn btn-success btn-sm me-2"
            onClick={handleTask}
          >
            <FaPlus className="m-2" />
          </button>
        </div>
        <div className="input-group flex-grow-1">
          <span className="input-group-text">
            <FaSearch />
          </span>
          <input
            className="form-control"
            type="text"
            placeholder="search tasks"
          />
        </div>
      </div>

      <div>
        {tasks.map((item, index) => {
          return (
            <div key={index} className="d-flex flex-column w-100">
              <div className="m-2 p-2 border bg-light w-100 rounded-3 d-flex justify-content-between align-items-center">
                <span
                  className={item.isDone ? "text-decoration-line-through" : ""}
                >
                  {item.taskName}
                </span>

                <div className="d-flex">
                  <button type="button" className="btn btn-success btn-sm me-2" onClick={()=>handleCheckAndUncheck(item)}>
                    <FaCheck />
                  </button>
                  <button type="button" className="btn btn-primary btn-sm me-2" onClick={()=>setUpdateTask(item)}>
                    <FaPencilAlt />
                  </button>
                  <button type="button" className="btn btn-danger btn-sm" onClick={()=>handleDeleteTask(item._id)}>
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
      />
    </div>
  );
};

export default TaskManager;
