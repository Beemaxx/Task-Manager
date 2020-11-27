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

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)


app.listen(port, () => {
    console.log('Server is up on ' +port)
})

const jwt = require('jsonwebtoken')

const myFunction = async () => {
    const token = jwt.sign({_id:'abc123'}, 'ramdomtoken',{expiresIn:'7 days'})
    console.log(token)

    const data = jwt.verify(token,'ramdomtoken')
    console.log(data)
}
myFunction ()
