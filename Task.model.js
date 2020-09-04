const mongoose = require('mongoose');
const taskSchema=new mongoose.Schema(
  {    
    task_name:
    {
    type:String,
    required:true
    },

    description:
    { 
      type:String,
      required:true
    },
   project_id:
    {
      type:mongoose.Schema.Types.ObjectId,
      required:true
    },
    createAt:
    {
      type:Date,
      default:new Date(),
    },
  });
 const task=mongoose.model('Task',taskSchema);
  module.exports=task;