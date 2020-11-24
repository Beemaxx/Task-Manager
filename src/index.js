const express = require('express')
const { translateAliases } = require('./model/task')
const Task = require('./model/task')
const User = require('./model/user')
require('./db/mongoose')
require('./model/user')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.post('/users',(req,res)=>{
    const user = new User(req.body)
    
    user.save().then(()=>{
        res.status(201).send(user)
    }).catch((error)=>{
        res.status(400).send(error)
    })
})

// Find users
app.get('/users', (req,res) => {
    User.find({}).then((users)=>{
        res.status(201).send(users)
    }).catch((error)=>{
        res.status(500).send()
    })
})
// Find by ID
app.get('/users/:id', (req,res) =>{

    const userid = req.params.id

    User.findById(userid).then((user) => {
        if (!user) {
            return res.status(400).send()
        }
        res.send(user)
    }).catch((error) => {
        res.status(500).send()
    })
})


app.post('/tasks',(req,res)=>{ 
    const task = new Task(req.body)

    task.save().then(() => {
        res.status(201).send(task)
    }).catch((error)=>{
        res.status(400).send(error)
    })

})


app.get('/tasks', (req,res) => {
    Task.find({}).then((task) => {
        res.status(201).send(task)
    }).catch((error) =>{ 
        res.status(400).send(error)
    })
})


app.get('/tasks/:id' , (req,res) => {

    const taskid = req.params.id

    Task.findById(taskid).then((task)=>{
        if(!task){
           return res.status(404).send()
        }
        res.status(201).send(task)
    }).catch((error) => {
        res.status(500).send()
    })

})










app.listen(port, () => {
    console.log('Server is up on ' +port)
})

