const mongoose=require('mongoose')



mongoose.connect("mongodb://localhost:27017/taskmanager")
.then(() => {
    console.log("✅ MongoDB is Connected.....");
  })
  .catch((err) => {
    console.log("❌ MongoDB connection Error:", err);
  });