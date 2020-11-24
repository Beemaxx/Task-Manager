require('../src/db/mongoose')
const Task = require('../src/model/task')

// Task.findByIdAndDelete('5fbb5da036f52f1df0942282').then((task) => {
//     console.log(task)
//     return Task.countDocuments({_id: "5fbb5da036f52f1df0942282"})
// }).then((result) =>{
//     console.log(result)
// }).catch((e)=> {
//     console.log(e)
// })

Task.countDocuments({Completed: false}).then((result)=>{
    console.log(result)
})

Task.deleteMany({Description : null}).then((task)=> {
    return Task.countDocuments({Description:null})
}).then((result)=>{
    console.log(result)
}).catch((e)=>{
    console.log(e)
})