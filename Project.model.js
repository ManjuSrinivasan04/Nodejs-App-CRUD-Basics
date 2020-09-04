let mongoose = require('mongoose');
let projectSchema=new mongoose.Schema({     //let us to use this model outside 
   project_name:
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
  }
});
const pro=mongoose.model("Project",projectSchema);
module.exports=pro;