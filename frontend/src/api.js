import { API_URL } from "./utils";

export const CreateTask = async (taskObj) => {
  const url = `${API_URL}/tasks`; // ✅ add /tasks here
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskObj),
  };

  try {
    const result = await fetch(url, options);

    if (!result.ok) {
      throw new Error(`Failed to create task: ${result.status}`);
    }

    const data = await result.json();
    return data;
  } catch (err) {
    console.error("API Error:", err);
    throw err;
  }
};

export const GetAllTasks = async (taskObj) => {
    const url = `${API_URL}/tasks`; // ✅ add /tasks here
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
  
    try {
      const result = await fetch(url, options);
  
      if (!result.ok) {
        throw new Error(`Failed to create task: ${result.status}`);
      }
  
      const data = await result.json();
      return data;
    } catch (err) {
      console.error("API Error:", err);
      throw err;
    }
  };
  


  export const DeleteTaskById = async (id) => {
    const url = `${API_URL}/tasks/${id}`; 
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
  
    try {
      const result = await fetch(url, options);
  
      if (!result.ok) {
        throw new Error(`Failed to Delete task: ${result.status}`);
      }
  
      const data = await result.json();
      return data;
    } catch (err) {
      console.error("API Error:", err);
      throw err;
    }
  };
  
  
    
  export const UpdateTaskById = async (id,reqBody) => {
    const url = `${API_URL}/tasks/${id}`; 
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify(reqBody)
    };
  
    try {
      const result = await fetch(url, options);
  
      if (!result.ok) {
        throw new Error(`Failed to Delete task: ${result.status}`);
      }
  
      const data = await result.json();
      return data;
    } catch (err) {
      console.error("API Error:", err);
      throw err;
    }
  };
  
  