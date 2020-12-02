const express = require('express')
const { ObjectID } = require('mongodb')
const { translateAliases, update } = require('./model/task')
const Task = require('./model/task')
const User = require('./model/user')
const userRouter = require('./routers/user.js')
const taskRouter = require('./routers/task.js')
require('./db/mongoose')
require('./model/user')


const app = express()
const port = process.env.PORT || 3000

// app.use((req,res, next )=>{
//     // console.log (req.method, req.path)
//     // next()
//     if(req.method === 'GET') {
//         res.send('GET requests are disabled')
//     }else {
//         next ()
//     }
// })

// // Server undermaintenance 
// app.use((req,res,next) => {
//     if (req.method) {
//         res.status(503).send('Server under maintenance!')
//     } else {
//         next()
//     }
// })

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)


app.listen(port, () => {
    console.log('Server is up on ' +port)
})


const main = async () =>{
    // find user who creates task
    // const task = await Task.findById('5fc71cf9a05be542784f52c3')
    // await task.populate('Owner').execPopulate()
    // console.log(task.Owner)

    // find tasks belong to user
    const user = await User.findById('5fc757c50c5369428476dc4d').populate('tasks').exec()

    console.log(user.tasks)
    
}

main()

const jwt = require('jsonwebtoken')

// const myFunction = async () => {
//     const token = jwt.sign({_id:'abc123'}, 'ramdomtoken',{expiresIn:'7 days'})
//     console.log(token)

//     const data = jwt.verify(token,'ramdomtoken')
//     console.log(data)
// }
// myFunction ()
