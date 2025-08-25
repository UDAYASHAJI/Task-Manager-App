
const express = require('express');
const app = express();
const cors = require("cors");

require('dotenv').config();
require('./Models/db'); // ✅ MongoDB connection
const TaskRouter = require('./Routes/TaskRouter');

const PORT = process.env.PORT || 8080;

// ✅ Middleware to parse JSON
app.use(express.json());
app.use(cors());


// Default route
app.get('/', (req, res) => {
  res.send("Hello from the server 🚀");
});

// ✅ Task routes
app.use('/tasks', TaskRouter);

app.listen(PORT, () => {
  console.log(`Server is running on PORT=${PORT}`);
});
