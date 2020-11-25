require('../src/db/mongoose')
const { count } = require('../src/model/task')
const Task = require('../src/model/task')

// Task.findByIdAndDelete('5fbb5da036f52f1df0942282').then((task) => {
//     console.log(task)
//     return Task.countDocuments({_id: "5fbb5da036f52f1df0942282"})
// }).then((result) =>{
//     console.log(result)
// }).catch((e)=> {
//     console.log(e)
// })

// //Count completed: false
// // Task.countDocuments({Completed: false}).then((result)=>{
// //     console.log(result)
// // })
// //Delete and count

const DeleteAndCount = async (id) => {
    const findanddelete = await Task.findByIdAndDelete(id)
    const countdeletedtask = await Task.countDocuments({_id:id})
    return countdeletedtask
}

DeleteAndCount('5fbcbfb900283066f3617297').then((count)=>{
    console.log(count)
}).catch((e)=>{
    console.log(e)
})


// Delete Many

// Task.deleteMany({Description : null}).then((task)=> {
//     return Task.countDocuments({Description:null})
// }).then((result)=>{
//     console.log(result)
// }).catch((e)=>{
//     console.log(e)
// })