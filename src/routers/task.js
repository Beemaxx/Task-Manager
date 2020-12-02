const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth.js')
const Task = require('../model/task.js')

//Create new task
router.post('/tasks', auth, async (req,res)=>{ 
    const task = new Task({
    ...req.body,
    Owner: req.user._id
    
    })
  
    try { 
        await  task.save()
        res.status(201).send(task)
    } catch(e){
        res.status(500).send()
    }

    // task.save().then(() => {
    //     res.status(201).send(task)
    // }).catch((error)=>{
    //     res.status(400).send(error)
    // })

})


router.get('/tasks', async (req,res) => {
    
    try { 
        const task = await Task.find({})
        res.status(201).send(task)
    } catch(e){
        res.status(500).send()
    }

    // Task.find({}).then((task) => {
    //     res.status(201).send(task)
    // }).catch((error) =>{ 
    //     res.status(400).send(error)
    // })
})


router.get('/tasks/:id' , async (req,res) => {

    const taskid = req.params.id

    try { 
        const task = await Task.findById(taskid)

        if(!task){
            return res.status(404).send()
        }
        res.status(200).send(task)

    } catch(e) {
        res.status(500).send()
    }

    // Task.findById(taskid).then((task)=>{
    //     if(!task){
    //        return res.status(404).send()
    //     }
    //     res.status(201).send(task)
    // }).catch((error) => {
    //     res.status(500).send()
    // })

})

//Find Task ID and update

router.patch('/tasks/:id', async (req,res) =>{

    const TaskUpdates = Object.keys(req.body)
    const AllowedTasksUpdates = ['Completed','Description']
    const TaskUpdateisValid = TaskUpdates.every((update) => AllowedTasksUpdates.includes((update)))
   
    if (!TaskUpdateisValid){
        res.status(400).send({error :'Update is invalid'})
    }
    const taskid = req.params.id

    try {
        //const task = await Task.findByIdAndUpdate(taskid, req.body, {new:true,runValidators:true})
        const task = await Task.findById(taskid)
        TaskUpdates.forEach((update) => task[update] = req.body[update])
        await task.save()
        
        if(!taskid){
            res.status(404).send()
        }
            res.status(200).send(task)
    } catch(e){
        res.status(400).send(e)
    }
})

//Delete Tasks

router.delete('/Tasks/:id', async (req,res)=>{
    const TaskID = req.params.id

    try {
        const DeleteTask = await Task.findByIdAndDelete(TaskID)

        if(!DeleteTask)
        {
            res.status(404).send()
        }
            res.status(200).send(DeleteTask + ' has been deleted')
    }catch(e) {
            res.status(404).send(e)
    }
})




module.exports = router