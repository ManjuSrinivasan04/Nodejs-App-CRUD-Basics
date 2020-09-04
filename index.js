let express =require('express');
let app=express();
let bodyParser=require('body-parser');
let mongoose=require('mongoose');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

let Task=require('./Task.model');
let Project=require('./Project.model');
const port=5000;

//connecting mongo and checking it whether connected or not

mongoose.connect("mongodb://localhost:27017/myTasks-mongoose",(err)=>{
    if(!err)
        console.log("Server Connected to Mongodb");
    
});

//adding tasks
app.post('/addTask',(req,res)=>{
    console.log("Adding new Task");
    let TaskObj = {
        "task_name":req.body.task_name,
        "description":req.body.description,
        "project_id":new mongoose.Types.ObjectId(),
        "createAt":req.body.createAt
    }
    let newTask=new Task(TaskObj);
    newTask.save((err,task)=>{
        if(err)
           res.status(400).send("There is an error while adding new Task");
        else
           res.status(200).json(task);
    });
})

//adding projects

app.post('/addProject',(req,res)=>{
    console.log("Adding new Project");
    let projectObj = {
        "project_name":req.body.project_name,
        "description":req.body.description,
        "project_id":new mongoose.Types.ObjectId()
    }
    let newProject=new Project(projectObj);
    newProject.save((err,project)=>{
        if(err)
           res.status(400).send("There is an error while adding new Project");
        else
           res.status(200).json(project);
    });
});




//getting task

app.get('/Task',(req,res)=>{
    console.log("Getting all Tasks");
    Task.find({}).populate("project_id").exec((err,task)=>{
        if(err)
           res.status(400).send("There is an error while getting Task");
        else
           res.status(200).json(task);
    });
});


//getting project

app.get('/Project',(req,res)=>{
    console.log("Getting all Tasks");
    Project.find({}).populate("project_id").exec((err,project)=>{
        if(err)
           res.status(400).send("There is an error while getting Project");
        else
           res.status(200).json(project);
    });
});


//editing task

app.put('/Task/:id',(req,res)=>{
    console.log("Editing all Tasks");
    let TaskObj = {
        
        "task_name":req.body.task_name,
        "description":req.body.description,
        
    }
    Task.findByIdAndUpdate(req.params.id,TaskObj,{new:true}).exec((err,task)=>{
        if(err)
           res.status(400).send("There is an error while editing Task");
        else
           res.status(200).json(task);
    });
});

//editing projects

app.put('/Project/:id',(req,res)=>{
    console.log("Editing all Project");
    let proObj = {
        
        "project_name":req.body.project_name,
        "description":req.body.description,
        
    }
    Project.findByIdAndUpdate(req.params.id,proObj,{new:true}).exec((err,project)=>{
        if(err)
           res.status(400).send("There is an error while editing Project");
        else
           res.status(200).json(project);
    });
});


//deleting tasks

app.delete('/Task/:id',(req,res)=>{
    console.log("deleting all Tasks");
    Task.findByIdAndDelete(req.params.id).exec((err,task)=>{
        if(err)
           res.status(400).send("There is an error while deleting task");
        else
           res.status(200).json(task);
    });
});

//deleting projects

app.delete('/Project/:id',(req,res)=>{
    console.log("deleting all Project");
    Project.findByIdAndDelete(req.params.id).exec((err,project)=>{
        if(err)
           res.status(400).send("There is an error while deleting Project");
        else
           res.status(200).json(project);
    });
});



//default api
app.get('/',(req,res)=>{
    res.send("Home Page");
});

app.listen(port,()=>{
    console.log("App is running on port ",port);
});